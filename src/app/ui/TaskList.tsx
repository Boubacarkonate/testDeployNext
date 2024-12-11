"use client";

import { useEffect, useState } from "react";
import TaskInput from "../component/TaskInput";
import TaskItem from "../component/TaskItem";
import { addTask, deleteTask, fetchTasks, updateTask } from "../services/taskService";

const TaskList = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskName, setTaskName] = useState<string>("");
  const [editingTask, setEditingTask] = useState<any | null>(null);
  const [error, setError] = useState<string>("");

  // Charger les tâches
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();

        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          throw new Error("Les données récupérées ne sont pas un tableau");
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    loadTasks();
  }, []);

  // Fonction pour jouter une tâche à la liste
  const handleAddTask = async () => {
    if (taskName.trim() === "") return;
    try {
      const newTask = await addTask({
        name: taskName,
        createdAt: new Date().toISOString(),
      });
      setTasks((prevTasks) => [...prevTasks, newTask]); 
      setTaskName("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Fonction pour MAJ une tâche avec une confirmation
  const handleSaveTask = async (taskId: number, updatedName: string) => {
    if (!editingTask || !editingTask.id) return;

    try {
      const updatedTask = await updateTask(taskId, { name: updatedName });

      // Affichage de la boîte de confirmation avant de recharger la page
      const isConfirmed = window.confirm("Êtes-vous sûr de vouloir enregistrer les modifications ?");

      if (isConfirmed) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
        );
        setEditingTask(null);
        window.location.reload(); 
      } else {
        setEditingTask(null); // Annuler la modification si l'utilisateur refuse
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  //Fonction pour supprimer une tâche
  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setEditingTask(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (error) {
    return <div className="text-red-500">Erreur : {error}</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800">Liste des tâches</h1>

      {/* Composant qui ajoute une tâche */}
      <TaskInput taskName={taskName} setTaskName={setTaskName} handleAddTask={handleAddTask} />

      {/* Liste des tâches */}
      <ul className="space-y-4">
        {tasks
          .filter((task) => task !== null && task !== undefined)
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
              handleSaveTask={handleSaveTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
      </ul>
    </div>
  );
};

export default TaskList;
