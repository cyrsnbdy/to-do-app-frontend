import { useTaskStore } from "@/stores/tasks/tasks.store";
import { useState } from "react";
import toast from "react-hot-toast";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (taskText: string, taskDescription: string) => void;
};

export const AddTaskModal = ({ isOpen, onClose, onAdd }: AddTaskModalProps) => {
  const [taskText, setTaskText] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const loading = useTaskStore((state) => state.loading);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskText.trim()) {
      toast.error("Task cannot be empty");
      return;
    }

    onAdd(taskText.trim(), taskDescription.trim());

    setTaskText("");
    setTaskDescription("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div className="bg-white rounded-lg flex flex-col items-center shadow-lg w-full max-w-sm border-[#1E319D] border-2 p-6 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
        >
          &times;
        </button>

        <h2 className="text-xl text-[#1E319D] font-semibold text-center mb-6">
          Add Task
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Task Title */}
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter task title"
            className="w-full border border-[#1E319D] rounded-2xl p-2"
          />

          {/* Task Description */}
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            className="w-full border border-[#1E319D] rounded-2xl p-2 resize-none h-24"
          />

          <button
            type="submit"
            className="px-4 py-2 rounded-3xl h-10 bg-[#1E319D] text-white hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};
