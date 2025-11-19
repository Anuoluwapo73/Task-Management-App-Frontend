import { useTasks as useTasksContext } from '../contexts/TaskContext';

/**
 * Custom hook to access task context
 * Re-exports the useTasks hook from TaskContext for convenience
 */
export const useTasks = useTasksContext;
