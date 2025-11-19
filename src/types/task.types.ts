// Task status type matching backend enum
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

// Task type matching backend Task model
export interface Task {
    _id: string;
    title: string;
    description: string;
    status: TaskStatus;
    user: string;
}

// Task creation input type
export interface CreateTaskInput {
    title: string;
    description: string;
    status?: TaskStatus;
}

// Task update input type
export interface UpdateTaskInput {
    title?: string;
    description?: string;
    status?: TaskStatus;
}

// Task API response types matching backend task controller responses
export interface TaskResponse {
    message: string;
    task?: Task;
}

export interface TasksResponse {
    message: string;
    tasks?: Task[];
}
