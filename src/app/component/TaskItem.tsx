interface TaskItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    task: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    editingTask: any | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setEditingTask: (task: any | null) => void;
    handleSaveTask: (taskId: number, updatedName: string) => void;
    handleDeleteTask: (taskId: number) => void;
  }
  
  const TaskItem = ({ task, editingTask, setEditingTask, handleSaveTask, handleDeleteTask }: TaskItemProps) => {
    return (
      <li key={task.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow-sm">
        {editingTask?.id === task.id ? (
          <div className="flex items-center">
            <input
              type="text"
              value={editingTask?.name || ''}
              onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
              className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
            <button
              onClick={() => handleSaveTask(task.id, editingTask.name)}
              className="px-3 py-1 text-white bg-green-500 rounded-md hover:bg-green-600 ml-2"
            >
              Sauvegarder
            </button>
            <button
              onClick={() => setEditingTask(null)} // bouton pour annuler la modification
              className="px-3 py-1 text-white bg-gray-500 rounded-md hover:bg-gray-600 ml-2"
            >
              Annuler
            </button>
          </div>
        ) : (
          <>
            <span className="text-gray-700">{task.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => setEditingTask(task)} // bouton pour modifier la tâche
                className="px-3 py-1 text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)} // bouton pour supprimer la tâche
                className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </>
        )}
      </li>
    );
  };
  
  export default TaskItem;
  