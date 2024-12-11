export const fetchTasks = async () => {
    const response = await fetch("http://localhost:3000/api/tasks");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des tâches");
    }
    return response.json();
  };
  
  export const addTask = async (task: { name: string; createdAt: string }) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout de la tâche");
    }
    return response.json();
  };
  
  export const updateTask = async (id: number, updates: { name: string; }) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour de la tâche");
    }
    return response.json();
  };
  
  export const deleteTask = async (id: number) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de la tâche");
    }
    return response.json();
  };
  