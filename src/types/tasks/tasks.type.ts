// Domain model (pure task data)
export type TaskType = {
  taskDescription: string;
  task: string;
  completed: boolean;
};

// API response (domain model + metadata)
export type TaskResponse = {
  message: string;
  task: TaskType & { _id: string; createdAt: string; updatedAt: string };
};
