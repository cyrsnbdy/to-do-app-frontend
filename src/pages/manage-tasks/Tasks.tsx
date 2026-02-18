import Button from "@/components/ButtonComponents";
import Logo from "@/images/to-do.png";
import { useAuthStore } from "@/stores/auth/auth.store";
import { useTaskStore } from "@/stores/tasks/tasks.store";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddTaskModal } from "./components/AddTaskModal";
import CheckTasks from "./components/CheckTasks";
import { DeleteTaskModal } from "./components/DeleteModal";
import { EditTaskModal } from "./components/EditModal";
import { ViewTaskModal } from "./components/viewTaskModal";

function Tasks() {
  const navigate = useNavigate();
  const { setLogout } = useAuthStore();
  const {
    tasks,
    getTasks,
    toggleTaskStatus,
    deleteTask,
    createTask,
    updateTask,
  } = useTaskStore();

  // Loading states
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [, setActionLoading] = useState(false);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskText, setEditTaskText] = useState<string>("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedTaskText, setSelectedTaskText] = useState<string>("");

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewTaskText, setViewTaskText] = useState("");
  const [viewTaskCompleted, setViewTaskCompleted] = useState(false);

  // Search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  // Decode basicToken for user email
  const basicToken = localStorage.getItem("basicToken");
  let userEmail = "";
  if (basicToken) {
    try {
      const decoded = atob(basicToken);
      userEmail = decoded.split(":")[0];
    } catch {
      userEmail = "";
    }
  }

  // Load tasks
  useEffect(() => {
    const fetchTasks = async () => {
      setLoadingTasks(true);
      await getTasks();
      setLoadingTasks(false);
    };
    fetchTasks();
  }, [getTasks]);

  // Filtered + searched tasks
  const displayedTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.task
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed);
      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchQuery, filter]);

  // Logout
  const handleLogout = async () => {
    try {
      await setLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Task handlers
  const handleAddTask = async (taskText: string) => {
    setActionLoading(true);
    const success = await createTask({ task: taskText });
    setActionLoading(false);
    if (success) setIsAddModalOpen(false);
  };

  const openEditModal = (id: string, text: string) => {
    setEditTaskId(id);
    setEditTaskText(text);
    setIsEditModalOpen(true);
  };

  const handleEditTask = async (newText: string) => {
    if (!editTaskId) return;
    setActionLoading(true);
    const success = await updateTask(editTaskId, { task: newText });
    setActionLoading(false);
    if (success) {
      setIsEditModalOpen(false);
      setEditTaskId(null);
      setEditTaskText("");
    }
  };

  const openDeleteModal = (id: string, text: string) => {
    setSelectedTaskId(id);
    setSelectedTaskText(text);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteTask = async () => {
    if (!selectedTaskId) return;
    setActionLoading(true);
    const success = await deleteTask(selectedTaskId);
    setActionLoading(false);
    if (success) {
      setIsDeleteModalOpen(false);
      setSelectedTaskId(null);
      setSelectedTaskText("");
    }
  };

  const openViewModal = (text: string, completed: boolean) => {
    setViewTaskText(text);
    setViewTaskCompleted(completed);
    setIsViewModalOpen(true);
  };

  // Completion summary
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="bg-[#1E319D] w-screen h-screen flex flex-col items-center justify-center">
      <div className="bg-white absolute inset-1.5 rounded-4xl flex flex-col justify-center items-center my-1">
        {/* Logo and User */}
        <div className="flex flex-col mb-8 items-center gap-4">
          <img src={Logo} alt="Logo" className="w-36" />
          <span>
            Welcome, <b>{userEmail || "username"}</b>
          </span>
        </div>

        {/* Add Task Button */}
        <div className="mt-6">
          <Button
            label="Add Task"
            className="w-52 h-10"
            onClick={() => setIsAddModalOpen(true)}
          />
        </div>

        {/* Search + Filter */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center w-full justify-center">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded ${filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
            <button
              className={`px-3 py-1 rounded ${filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
          </div>
        </div>

        {/* Completion Summary */}
        <div className="mt-4 text-gray-600">
          {tasks.length > 0
            ? `${completedCount}/${tasks.length} tasks completed`
            : "No tasks yet"}
        </div>

        {/* Task List */}
        <div className="mt-4 overflow-y-auto flex flex-col gap-3 h-80 w-full px-4">
          {loadingTasks ? (
            <div className="text-center py-10">Loading tasks...</div>
          ) : displayedTasks.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No tasks found
            </div>
          ) : (
            displayedTasks.map((task) => (
              <CheckTasks
                key={task._id}
                taskText={task.task}
                completed={task.completed}
                onChange={async () => {
                  setActionLoading(true);
                  await toggleTaskStatus(task._id);
                  await getTasks();
                  setActionLoading(false);
                }}
                onView={() => openViewModal(task.task, task.completed)}
                onDeleteClick={() => openDeleteModal(task._id, task.task)}
                onEdit={() => openEditModal(task._id, task.task)}
              />
            ))
          )}
        </div>

        {/* Modals */}
        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddTask}
        />
        {editTaskId && (
          <EditTaskModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            taskId={editTaskId}
            initialText={editTaskText}
            onEdit={handleEditTask}
          />
        )}
        {selectedTaskId && (
          <DeleteTaskModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            taskId={selectedTaskId}
            taskText={selectedTaskText}
            onDelete={handleDeleteTask}
          />
        )}
        {isViewModalOpen && (
          <ViewTaskModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            taskText={viewTaskText}
            completed={viewTaskCompleted}
          />
        )}

        {/* Logout */}
        <div className="mt-6">
          <Button label="Logout" className="w-52 h-10" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
