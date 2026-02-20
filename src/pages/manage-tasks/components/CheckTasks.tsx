import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface CheckTasksProps {
  taskText: string;
  taskDescription?: string;
  completed: boolean;
  onChange: () => void;
  onDeleteClick?: () => void;
  onEdit?: () => void;
  onView?: () => void;
}

function CheckTasks({
  taskText,
  taskDescription,
  completed,
  onChange,
  onDeleteClick,
  onEdit,
  onView,
}: CheckTasksProps) {
  return (
    <div
      className={`group flex items-start gap-4 w-full p-4 rounded-2xl 
      border transition-all duration-200 
      ${
        completed
          ? "bg-gray-50 border-[#1E319D]"
          : "bg-white border-[#1E319D] hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={completed}
        onChange={onChange}
        className="mt-1 w-5 h-5 accent-[#1E319D] cursor-pointer"
      />

      {/* Task Content */}
      <button type="button" onClick={onView} className="flex-1 text-left">
        {/* Title */}
        <h3
          className={`font-semibold text-base transition-colors ${
            completed
              ? "line-through text-gray-400"
              : "text-gray-800 group-hover:text-[#1E319D]"
          }`}
        >
          {taskText}
        </h3>

        {/* Description */}
        {taskDescription && (
          <p
            className={`text-sm mt-1 ${
              completed ? "text-gray-300" : "text-gray-500"
            } line-clamp-2`}
          >
            {taskDescription}
          </p>
        )}
      </button>

      {/* Actions */}
      <div className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition">
        <button
          onClick={onEdit}
          className="p-2 rounded-full hover:bg-blue-50 transition"
        >
          <FaPencil className="text-[#1E319D]" />
        </button>

        <button
          onClick={onDeleteClick}
          className="p-2 rounded-full hover:bg-red-50 transition"
        >
          <FaTrash className="text-[#A60C00]" />
        </button>
      </div>
    </div>
  );
}

export default CheckTasks;
