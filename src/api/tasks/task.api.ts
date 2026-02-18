import type { TaskType } from "@/types/tasks/tasks.type";
import axiosInstance from "../../axios/axios-instance";

export type TaskResponse = {
  message: string;
  task: TaskType & { _id: string; createdAt: string; updatedAt: string };
};

export type TasksResponse = {
  message: string;
  count: number;
  tasks: (TaskType & { _id: string; createdAt: string; updatedAt: string })[];
};

// Create a new task
export const createTaskApi = async (data: { task: string }) => {
  // Change from "/tasks/add" to "/tasks/"
  const response = await axiosInstance.post<TaskResponse>("/tasks/", data);
  return response.data;
};

// Get all tasks
export const getTasksApi = async () => {
  // Keep "/tasks" - this is correct for GET all
  const response = await axiosInstance.get<TasksResponse>("/tasks/");
  return response.data;
};

// Get single task by ID
export const getTaskByIdApi = async (id: string) => {
  // Keep "/tasks/${id}" - this is correct
  const response = await axiosInstance.get<TaskResponse>(`/tasks/${id}`);
  return response.data;
};

// Update task
export const updateTaskApi = async (id: string, data: Partial<TaskType>) => {
  // Change from "/tasks/update/${id}" to "/tasks/${id}"
  const response = await axiosInstance.put<TaskResponse>(`/tasks/${id}`, data);
  return response.data;
};

// Toggle task completion status
export const toggleTaskStatusApi = async (id: string) => {
  // Keep "/tasks/${id}/toggle" - this is correct
  const response = await axiosInstance.patch<TaskResponse>(
    `/tasks/${id}/toggle`,
  );
  return response.data;
};

// Delete task
export const deleteTaskApi = async (id: string) => {
  // Change from "/tasks/delete/${id}" to "/tasks/${id}"
  const response = await axiosInstance.delete<{ message: string }>(
    `/tasks/${id}`,
  );
  return response.data;
};
