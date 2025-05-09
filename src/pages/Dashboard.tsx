import { useContext, useState } from "react";
import Context from "../context/Context";
import TaskCard from "../components/TaskCard";
import { FiFilter, FiX, FiPlus } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: "Not Started" | "In Progress" | "Completed";
  updatedAt: string;
}

const Dashboard = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Context must be used within a ContextProvider");
  }
  const { tasks, setTasks } = context;

  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "updatedAt">>({
    title: "",
    description: "",
    assignedTo: "",
    status: "Not Started",
  });

  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const handleStatusChange = (id: string, newStatus: string) => {
    setTasks(
      tasks.map((task: Task) =>
        task.id === id
          ? {
              ...task,
              status: newStatus as Task["status"],
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const handleEdit = (updatedTask: Task) => {
    setTasks(
      tasks.map((task: Task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task: Task) => task.id !== id));
  };

  const handleCreateTask = () => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks([task, ...tasks]);
    setNewTask({
      title: "",
      description: "",
      assignedTo: "",
      status: "Not Started",
    });
    setShowCreateModal(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const filteredTasks = tasks.filter((task: Task) => {
    if (statusFilter === "All") return true;
    return task.status === statusFilter;
  });

  const statusOptions: string[] = [
    "All",
    "Not Started",
    "In Progress",
    "Completed",
  ];

  return (
    <div className="p-2 sm:p-6 w-full overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Tasks</h2>
        <div className="flex gap-4">
          {auth.userType === "admin" && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FiPlus />
              <span>New Task</span>
            </button>
          )}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FiFilter />
              <span>Filters</span>
            </button>

            {showFilters && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Filter by Status</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {statusOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="statusFilter"
                          checked={statusFilter === option}
                          onChange={() => {
                            setStatusFilter(option);
                            setShowFilters(false);
                          }}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500">
            {statusFilter === "All"
              ? "No tasks found"
              : `No ${statusFilter.toLowerCase()} tasks`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {statusFilter !== "All" && (
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Showing: {statusFilter} tasks ({filteredTasks.length} of{" "}
            {tasks.length})
          </span>
          <button
            onClick={() => setStatusFilter("All")}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Clear filter
          </button>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-lg font-medium text-gray-900">
                Create New Task
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned To
                </label>
                <input
                  type="text"
                  name="assignedTo"
                  value={newTask.assignedTo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={newTask.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 border-t border-gray-200 p-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                disabled={!newTask.title}
                className={`px-4 py-2 rounded-md ${
                  !newTask.title
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white`}
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
