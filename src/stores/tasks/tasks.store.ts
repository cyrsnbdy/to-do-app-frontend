import {
  createTaskApi,
  deleteTaskApi,
  getTaskByIdApi,
  getTasksApi,
  toggleTaskStatusApi,
  updateTaskApi,
} from "@/api/tasks/task.api";
import type { TaskType } from "@/types/tasks/tasks.type";
import { showError } from "@/utils/error/error.utils";
import toast from "react-hot-toast";
import { create } from "zustand";

type TaskWithMeta = TaskType & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type TaskStoreType = {
  loading: boolean;
  tasks: TaskWithMeta[];
  selectedTask: TaskWithMeta | null;

  createTask: (data: { task: string }) => Promise<boolean>;
  getTasks: () => Promise<boolean>;
  getTaskById: (id: string) => Promise<boolean>;
  updateTask: (id: string, data: Partial<TaskType>) => Promise<boolean>;
  toggleTaskStatus: (id: string) => Promise<boolean>;
  deleteTask: (id: string) => Promise<boolean>;
};

export const useTaskStore = create<TaskStoreType>((set, get) => ({
  loading: false,
  tasks: [],
  selectedTask: null,

  // 🔹 CREATE
  createTask: async (data) => {
    set({ loading: true });
    try {
      const response = await createTaskApi(data);

      toast.success(response.message);

      set({
        tasks: [...get().tasks, response.task],
      });

      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 GET ALL
  getTasks: async () => {
    set({ loading: true });
    try {
      const response = await getTasksApi();
      console.log("Tasks response:", response); // <- Add this

      set({ tasks: response.tasks });

      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 GET BY ID
  getTaskById: async (id) => {
    set({ loading: true });
    try {
      const response = await getTaskByIdApi(id);

      set({
        selectedTask: response.task,
      });

      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 UPDATE
  updateTask: async (id, data) => {
    set({ loading: true });
    try {
      const response = await updateTaskApi(id, data);

      toast.success(response.message);

      set({
        tasks: get().tasks.map((task) =>
          task._id === id ? response.task : task,
        ),
        selectedTask:
          get().selectedTask?._id === id ? response.task : get().selectedTask,
      });

      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 TOGGLE STATUS
  toggleTaskStatus: async (id) => {
    try {
      const response = await toggleTaskStatusApi(id);

      set({
        tasks: get().tasks.map((task) =>
          task._id === id ? response.task : task,
        ),
      });

      return true;
    } catch (error) {
      showError(error);
      return false;
    }
  },

  // 🔹 DELETE
  deleteTask: async (id) => {
    set({ loading: true });
    try {
      const response = await deleteTaskApi(id);

      toast.success(response.message);

      set({
        tasks: get().tasks.filter((task) => task._id !== id),
        selectedTask:
          get().selectedTask?._id === id ? null : get().selectedTask,
      });

      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
