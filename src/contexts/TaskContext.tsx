import { createContext, useContext, useState, type ReactNode } from 'react';
import taskService from '../services/taskService';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types';

interface TaskContextType {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    createTask: (input: CreateTaskInput) => Promise<void>;
    updateTask: (id: string, input: UpdateTaskInput) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    markAsCompleted: (id: string) => Promise<void>;
    markAsInProgress: (id: string) => Promise<void>;
    markAsPending: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
    children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async (): Promise<void> => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await taskService.getAllTasks();
            setTasks(response.tasks || []);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tasks';
            setError(errorMessage);
            console.error('Error fetching tasks:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const createTask = async (input: CreateTaskInput): Promise<void> => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await taskService.createTask(input);
            
            console.log('Create task response:', response);
            
            // Optimistically update state with the new task
            if (response.task) {
                console.log('Adding task to state:', response.task);
                setTasks((prevTasks) => {
                    const newTasks = [...prevTasks, response.task!];
                    console.log('Updated tasks:', newTasks);
                    return newTasks;
                });
            } else {
                console.warn('No task in response:', response);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create task';
            setError(errorMessage);
            console.error('Error creating task:', err);
            throw err; // Re-throw to allow caller to handle
        } finally {
            setIsLoading(false);
        }
    };

    const updateTask = async (id: string, input: UpdateTaskInput): Promise<void> => {
        // Store previous state for rollback on error
        const previousTasks = [...tasks];
        
        try {
            setIsLoading(true);
            setError(null);
            
            // Optimistically update the task in state
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? { ...task, ...input } : task
                )
            );
            
            const response = await taskService.updateTask(id, input);
            
            // Update with the actual response from server
            if (response.task) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === id ? response.task! : task
                    )
                );
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
            setError(errorMessage);
            console.error('Error updating task:', err);
            
            // Rollback to previous state on error
            setTasks(previousTasks);
            throw err; // Re-throw to allow caller to handle
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTask = async (id: string): Promise<void> => {
        // Store previous state for rollback on error
        const previousTasks = [...tasks];
        
        try {
            setIsLoading(true);
            setError(null);
            
            // Optimistically remove the task from state
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
            
            await taskService.deleteTask(id);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
            setError(errorMessage);
            console.error('Error deleting task:', err);
            
            // Rollback to previous state on error
            setTasks(previousTasks);
            throw err; // Re-throw to allow caller to handle
        } finally {
            setIsLoading(false);
        }
    };

    const markAsCompleted = async (id: string): Promise<void> => {
        // Store previous state for rollback on error
        const previousTasks = [...tasks];
        
        try {
            setIsLoading(true);
            setError(null);
            
            // Optimistically update the task status
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? { ...task, status: 'completed' as const } : task
                )
            );
            
            const response = await taskService.markAsCompleted(id);
            
            // Update with the actual response from server
            if (response.task) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === id ? response.task! : task
                    )
                );
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to mark task as completed';
            setError(errorMessage);
            console.error('Error marking task as completed:', err);
            
            // Rollback to previous state on error
            setTasks(previousTasks);
            throw err; // Re-throw to allow caller to handle
        } finally {
            setIsLoading(false);
        }
    };

    const markAsInProgress = async (id: string): Promise<void> => {
        // Store previous state for rollback on error
        const previousTasks = [...tasks];
        
        try {
            setIsLoading(true);
            setError(null);
            
            // Optimistically update the task status
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? { ...task, status: 'in-progress' as const } : task
                )
            );
            
            const response = await taskService.markAsInProgress(id);
            
            // Update with the actual response from server
            if (response.task) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === id ? response.task! : task
                    )
                );
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to mark task as in-progress';
            setError(errorMessage);
            console.error('Error marking task as in-progress:', err);
            
            // Rollback to previous state on error
            setTasks(previousTasks);
            throw err; // Re-throw to allow caller to handle
        } finally {
            setIsLoading(false);
        }
    };

    const markAsPending = async (id: string): Promise<void> => {
        // Store previous state for rollback on error
        const previousTasks = [...tasks];
        
        try {
            setIsLoading(true);
            setError(null);
            
            // Optimistically update the task status
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? { ...task, status: 'pending' as const } : task
                )
            );
            
            const response = await taskService.markAsPending(id);
            
            // Update with the actual response from server
            if (response.task) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === id ? response.task! : task
                    )
                );
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to mark task as pending';
            setError(errorMessage);
            console.error('Error marking task as pending:', err);
            
            // Rollback to previous state on error
            setTasks(previousTasks);
            throw err; // Re-throw to allow caller to handle
        } finally {
            setIsLoading(false);
        }
    };

    const value: TaskContextType = {
        tasks,
        isLoading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        markAsCompleted,
        markAsInProgress,
        markAsPending,
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks(): TaskContextType {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
}
