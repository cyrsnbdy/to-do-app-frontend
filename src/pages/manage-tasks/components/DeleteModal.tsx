import { useTaskStore } from "@/stores/tasks/tasks.store";

type DeleteTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  taskText?: string;
  onDelete: () => void; // new prop
};

export const DeleteTaskModal = ({
  isOpen,
  onClose,
  taskText,
  onDelete,
}: DeleteTaskModalProps) => {
  const loading = useTaskStore((state) => state.loading);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div
        className="bg-white rounded-lg flex flex-col items-center
                  max-h-[80vh] overflow-y-auto
                  shadow-lg w-full max-w-sm 
                  border-[#1E319D] border-2 p-6 relative"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-[#1E319D]">
          Delete Task
        </h2>
        <p className="mb-6">
          Are you sure you want to delete this task{" "}
          <h1 className="max-w-[200px] inline-block truncate">
            {taskText || ""}
          </h1>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-md border border-[#1E319D] hover:bg-[#1E319D] hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDelete} // calls handleDeleteTask
            disabled={loading}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
