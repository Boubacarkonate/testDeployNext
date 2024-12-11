interface TaskInputProps {
    taskName: string;
    setTaskName: (taskName: string) => void;
    handleAddTask: () => void;
  }
  
  const TaskInput = ({ taskName, setTaskName, handleAddTask }: TaskInputProps) => {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          placeholder="Entrez une tâche"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Ajouter Tâche
        </button>
      </div>
    );
  };
  
  export default TaskInput;
  