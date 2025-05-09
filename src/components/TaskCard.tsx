// components/TaskCard.tsx
import { useState } from "react";
import { FiEdit2, FiTrash2, FiCheckCircle, FiClock, FiX } from "react-icons/fi";
import { format } from "date-fns";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    status: "Not Started" | "In Progress" | "Completed";
    updatedAt: string;
  };
  onEdit?: (updatedTask: typeof task) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, newStatus: string) => void;
}

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const statusColors = {
    "Not Started": "bg-gray-100 text-gray-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
  };

  const statusIcons = {
    "Not Started": <FiClock className="mr-1" />,
    "In Progress": (
      <div className="w-3 h-3 rounded-full bg-blue-500 mr-1 animate-pulse" />
    ),
    Completed: <FiCheckCircle className="mr-1" />,
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onEdit) {
      onEdit({
        ...editedTask,
        updatedAt: new Date().toISOString(),
      });
    }
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg text-gray-800">{task.title}</h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                statusColors[task.status]
              } flex items-center`}
            >
              {statusIcons[task.status]}
              {task.status}
            </span>
          </div>

          <p className="text-gray-600 mb-4">{task.description}</p>

          <div className="flex justify-between items-center text-sm">
            <div className="text-gray-500">
              Last updated: {format(new Date(task.updatedAt), "MMM d, yyyy")}
            </div>

            <div className="flex space-x-2">
              {onStatusChange && task.status !== "Completed" && (
                <button
                  onClick={() => onStatusChange(task.id, "Completed")}
                  className="p-1 cursor-pointer text-green-600 hover:bg-green-50 rounded"
                  title="Mark Complete"
                >
                  <FiCheckCircle />
                </button>
              )}

              {onEdit && (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="p-1 cursor-pointer text-blue-600 hover:bg-blue-50 rounded"
                  title="Edit Task"
                >
                  <FiEdit2 />
                </button>
              )}

              {onDelete && (
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-1 cursor-pointer text-red-600 hover:bg-red-50 rounded"
                  title="Delete Task"
                >
                  <FiTrash2 />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/15 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Task</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editedTask.description}
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
                  value={editedTask.assignedTo}
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
                  value={editedTask.status}
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
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
