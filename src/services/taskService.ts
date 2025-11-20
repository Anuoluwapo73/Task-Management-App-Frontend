import apiClient from './api';
import type { CreateTaskInput, UpdateTaskInput, TaskResponse, TasksResponse } from '../types';

/**
 * Task service for CRUD operations on tasks
 */
const taskService = {
    /**
     * Get all tasks for the authenticated user
     * @returns Promise with tasks response containing array of tasks
     */
    async getAllTasks(): Promise<TasksResponse> {
        const response = await apiClient.get<TasksResponse>('/api/task');
        return response.data;
    },

    /**
     * Create a new task
     * @param input - Task creation data (title, description, optional status)
     * @returns Promise with task response containing the created task
     */
    async createTask(input: CreateTaskInput): Promise<TaskResponse> {
        const response = await apiClient.post<TaskResponse>('/api/task', input);
        return response.data;
    },

    /**
     * Update an existing task
     * @param id - Task ID
     * @param input - Task update data (optional title, description, status)
     * @returns Promise with task response containing the updated task
     */
    async updateTask(id: string, input: UpdateTaskInput): Promise<TaskResponse> {
        const response = await apiClient.put<TaskResponse>(`/api/task/${id}`, input);
        return response.data;
    },

    /**
     * Delete a task
     * @param id - Task ID
     * @returns Promise with task response
     */
    async deleteTask(id: string): Promise<TaskResponse> {
        const response = await apiClient.delete<TaskResponse>(`/api/task/${id}`);
        return response.data;
    },

    /**
     * Mark a task as completed
     * @param id - Task ID
     * @returns Promise with task response containing the updated task
     */
    async markAsCompleted(id: string): Promise<TaskResponse> {
        const response = await apiClient.patch<TaskResponse>(`/api/task/complete/${id}`);
        return response.data;
    },

    /**
     * Mark a task as in-progress
     * @param id - Task ID
     * @returns Promise with task response containing the updated task
     */
    async markAsInProgress(id: string): Promise<TaskResponse> {
        const response = await apiClient.patch<TaskResponse>(`/api/task/in-progress/${id}`);
        return response.data;
    },

    /**
     * Mark a task as pending
     * @param id - Task ID
     * @returns Promise with task response containing the updated task
     */
    async markAsPending(id: string): Promise<TaskResponse> {
        const response = await apiClient.patch<TaskResponse>(`/api/task/pending/${id}`);
        return response.data;
    },
};

export default taskService; 