// components/EditModal.tsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  initialText: string;
  onEdit: (newText: string) => Promise<void>; // <-- add this
}

export const EditTaskModal = ({
  isOpen,
  onClose,
  initialText,
  onEdit,
}: EditTaskModalProps) => {
  const [text, setText] = useState(initialText);

  // update local state if initialText changes
  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("Task cannot be empty");
      return;
    }
    await onEdit(text.trim());
  };

  return (
    <div className="fixed flex inset-0 items-center justify-center bg-black/20 z-50">
      <div className="bg-white rounded-lg flex flex-col items-center justify-center shadow-lg w-full max-w-sm border-[#1E319D] border-2 p-6 relative">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
        >
          &times;
        </button>

        <h2 className="text-xl text-[#1E319D] font-semibold text-center my-7 ">
          EDIT TASK
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Edit task"
            className="w-80 border border-[#1E319D] rounded-2xl p-2 mb-4"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className={`px-4 py-2 rounded-3xl w-30 h-10 bg-[#1E319D] text-white hover:bg-blue-600 disabled:opacity-50`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
