type ViewTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  taskText: string;
  completed: boolean;
};

export const ViewTaskModal = ({
  isOpen,
  onClose,
  taskText,
  completed,
}: ViewTaskModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div
        className="bg-white rounded-lg w-full max-w-sm 
                  max-h-[80vh] flex flex-col
                  border-2 border-[#1E319D] shadow-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
        >
          &times;
        </button>

        <div className="p-6 border-b">
          <h2 className="text-xl text-center text-[#1E319D] font-semibold">
            Task Details
          </h2>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <p
            className={`text-lg break-words ${
              completed ? "line-through text-gray-400" : ""
            }`}
          >
            {taskText}
          </p>
        </div>

        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border bg-[#1E319D] border-white text-white hover:bg-white hover:text-[#1E319D] hover:border-[#1E319D]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
