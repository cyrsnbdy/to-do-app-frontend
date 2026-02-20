import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/ButtonComponents";
import ModalPopup from "@/components/ModalPopup";
import Logo from "@/images/to-do.png";

import { useAuthStore } from "@/stores/auth/auth.store";
import { useTaskStore } from "@/stores/tasks/tasks.store";
import { useTokenStore } from "@/stores/token/token.store";

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { AddTaskModal } from "./components/AddTaskModal";
import CheckTasks from "./components/CheckTasks";
import { DeleteTaskModal } from "./components/DeleteModal";
import { EditTaskModal } from "./components/EditModal";
import { ViewTaskModal } from "./components/viewTaskModal";

/* =======================
   Types
======================= */

type FilterType = "all" | "completed" | "pending";

type Task = {
  _id: string;
  task: string;
  completed: boolean;
};

type ModalState =
  | { type: "add" }
  | { type: "edit"; task: Task }
  | { type: "delete"; task: Task }
  | { type: "view"; task: Task }
  | null;

/* =======================
   Constants
======================= */

const FILTERS: { key: FilterType; label: string; activeColor: string }[] = [
  { key: "all", label: "All", activeColor: "bg-blue-600" },
  { key: "completed", label: "Completed", activeColor: "bg-green-600" },
  { key: "pending", label: "Pending", activeColor: "bg-yellow-500" },
];

const MESSAGES = {
  ADD_SUCCESS: "Task added successfully!",
  UPDATE_SUCCESS: "Task updated successfully!",
  DELETE_SUCCESS: "Task deleted successfully!",
  ERROR_GENERIC: "Something went wrong. Please try again.",
};

/* =======================
   Component
======================= */

function Tasks() {
  const navigate = useNavigate();

  const { user, setLogout } = useAuthStore();
  const { initialized, accessToken } = useTokenStore();

  const {
    tasks,
    getTasks,
    toggleTaskStatus,
    deleteTask,
    createTask,
    updateTask,
  } = useTaskStore();

  const [loadingTasks, setLoadingTasks] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [modal, setModal] = useState<ModalState>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const [popup, setPopup] = useState({
    open: false,
    message: "",
    type: "info" as "success" | "error" | "warning" | "info",
  });

  /* =======================
     Fetch Tasks
  ======================= */

  useEffect(() => {
    if (!initialized || !accessToken) return;

    const fetchTasks = async () => {
      try {
        setLoadingTasks(true);
        await getTasks();
      } catch {
        showError(MESSAGES.ERROR_GENERIC);
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, [initialized, accessToken, getTasks]);

  /* =======================
     Memoized Values
  ======================= */

  const completedCount = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks],
  );

  const filteredTasks = useMemo(() => {
    const lowerSearch = searchQuery.toLowerCase().trim();

    return tasks.filter((task) => {
      const matchesSearch =
        !lowerSearch || task.task.toLowerCase().includes(lowerSearch);

      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed);

      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchQuery, filter]);

  /* =======================
     Helpers
  ======================= */

  const showSuccess = (message: string) =>
    setPopup({ open: true, message, type: "success" });

  const showError = (message: string) =>
    setPopup({ open: true, message, type: "error" });

  /* =======================
     Handlers
  ======================= */

  const handleLogout = useCallback(async () => {
    try {
      await setLogout();
      navigate("/login");
    } catch {
      showError(MESSAGES.ERROR_GENERIC);
    }
  }, [setLogout, navigate]);

  const handleAddTask = useCallback(
    async (taskText: string, taskDescription: string) => {
      try {
        setActionLoading(true);
        const success = await createTask({
          task: taskText,
          taskDescription: taskDescription,
        });

        if (!success) throw new Error();

        setModal(null);
        showSuccess(MESSAGES.ADD_SUCCESS);
      } catch {
        showError(MESSAGES.ERROR_GENERIC);
      } finally {
        setActionLoading(false);
      }
    },
    [createTask],
  );

  const handleEditTask = useCallback(
    async (taskId: string, newText: string, taskDescription: string) => {
      try {
        setActionLoading(true);
        const success = await updateTask(taskId, {
          task: newText,
          taskDescription,
        });

        if (!success) throw new Error();

        setModal(null);
        showSuccess(MESSAGES.UPDATE_SUCCESS);
      } catch {
        showError(MESSAGES.ERROR_GENERIC);
      } finally {
        setActionLoading(false);
      }
    },
    [updateTask],
  );

  const handleDeleteTask = useCallback(
    async (taskId: string) => {
      try {
        setActionLoading(true);
        const success = await deleteTask(taskId);

        if (!success) throw new Error();

        setModal(null);
        showSuccess(MESSAGES.DELETE_SUCCESS);
      } catch {
        showError(MESSAGES.ERROR_GENERIC);
      } finally {
        setActionLoading(false);
      }
    },
    [deleteTask],
  );

  const handleToggle = useCallback(
    async (taskId: string) => {
      try {
        await toggleTaskStatus(taskId);
      } catch {
        showError(MESSAGES.ERROR_GENERIC);
      }
    },
    [toggleTaskStatus],
  );

  /* =======================
     Render
  ======================= */

  return (
    <div className="bg-[#1E319D] w-screen h-screen flex items-center justify-center">
      <div className="bg-white absolute inset-1.5 rounded-4xl flex flex-col items-center py-10 px-6">
        <div className="w-full max-w-xl flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-3">
            <img src={Logo} alt="Logo" className="w-36" />
            <span>
              Welcome, <b>{user?.name}</b>
            </span>
          </div>

          {/* Search + Add */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <HiOutlineMagnifyingGlass
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />

              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border p-2 rounded-3xl pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={actionLoading}
              />
            </div>

            <Button
              label="Add Task"
              className="w-40 h-10"
              onClick={() => setModal({ type: "add" })}
              disabled={actionLoading}
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-3 gap-3 w-full text-center font-bold">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`py-2 rounded-full transition-colors ${
                  filter === f.key
                    ? `${f.activeColor} text-white`
                    : "bg-gray-200 text-gray-700"
                }`}
                disabled={actionLoading}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="text-gray-600 text-center">
            {tasks.length > 0
              ? `${completedCount}/${tasks.length} tasks completed`
              : "No tasks yet"}
          </div>

          {/* Task List */}
          <div className="overflow-y-auto flex flex-col gap-3 h-100 w-full pr-2">
            {loadingTasks ? (
              <div className="text-center py-10 text-gray-500">
                Loading tasks...
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                {tasks.length === 0
                  ? "No tasks yet"
                  : "No matching tasks found"}
              </div>
            ) : (
              filteredTasks.map((task) => (
                <CheckTasks
                  key={task._id}
                  taskText={task.task}
                  taskDescription={task.taskDescription}
                  completed={task.completed}
                  onChange={() => handleToggle(task._id)}
                  onEdit={() => setModal({ type: "edit", task })}
                  onDeleteClick={() => setModal({ type: "delete", task })}
                  onView={() => setModal({ type: "view", task })}
                />
              ))
            )}
          </div>

          {/* Logout */}
          <Button
            label="Logout"
            className="w-40 h-10 self-center"
            onClick={handleLogout}
            disabled={actionLoading}
          />
        </div>

        {/* Modals */}
        {modal?.type === "add" && (
          <AddTaskModal
            isOpen={true}
            onClose={() => setModal(null)}
            onAdd={handleAddTask}
          />
        )}

        {modal?.type === "edit" && (
          <EditTaskModal
            isOpen={true}
            onClose={() => setModal(null)}
            taskId={modal.task._id}
            initialText={modal.task.task}
            onEdit={(newText: string) =>
              handleEditTask(modal.task._id, newText, taskDescription)
            }
          />
        )}

        {modal?.type === "delete" && (
          <DeleteTaskModal
            isOpen={true}
            onClose={() => setModal(null)}
            taskId={modal.task._id}
            taskText={modal.task.task}
            onDelete={() => handleDeleteTask(modal.task._id)}
          />
        )}

        {modal?.type === "view" && (
          <ViewTaskModal
            isOpen={true}
            onClose={() => setModal(null)}
            taskText={modal.task.task}
            completed={modal.task.completed}
          />
        )}

        {/* Popup */}
        <ModalPopup
          isOpen={popup.open}
          title="Notice"
          message={popup.message}
          type={popup.type}
          autoCloseTime={2500}
          onClose={() => setPopup((prev) => ({ ...prev, open: false }))}
        />
      </div>
    </div>
  );
}

export default Tasks;
