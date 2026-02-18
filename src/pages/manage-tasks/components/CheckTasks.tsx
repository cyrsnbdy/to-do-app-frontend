import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface CheckTasksProps {
  taskText: string;
  completed: boolean;
  onChange: () => void;
  onDeleteClick?: () => void;
  onEdit?: () => void;
  onView?: () => void; // 👈 new prop
}

function CheckTasks({
  taskText,
  completed,
  onChange,
  onDeleteClick,
  onEdit,
  onView,
}: CheckTasksProps) {
  return (
    <div className="flex items-center gap-2 mx-auto">
      {/* Checkbox = toggle */}
      <input type="checkbox" checked={completed} onChange={onChange} />

      {/* Label = open modal */}
      <button
        type="button"
        onClick={onView}
        className={`border border-black rounded-3xl w-65 h-11 text-sm text-center p-2 truncate ${
          completed ? "line-through text-gray-400" : ""
        }`}
      >
        {taskText}
      </button>

      <button onClick={onDeleteClick}>
        <FaTrash color="#A60C00" />
      </button>

      <button onClick={onEdit}>
        <FaPencil color="#1E319D" />
      </button>
    </div>
  );
}

export default CheckTasks;
