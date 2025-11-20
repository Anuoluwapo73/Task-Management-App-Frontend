import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { TaskBoard } from '../components/tasks/TaskBoard';
import { CreateTaskModal } from '../components/tasks/CreateTaskModal';
import { EditTaskModal } from '../components/tasks/EditTaskModal';
import { DeleteConfirmationModal } from '../components/tasks/DeleteConfirmationModal';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useTasks } from '../hooks/useTasks';
import { useToast } from '../contexts/ToastContext';
import type { Task, TaskStatus } from '../types';

interface DashboardPageProps {
  filter?: 'all' | 'pending' | 'in-progress' | 'completed';
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ filter }) => {
  const { tasks, isLoading, fetchTasks, markAsCompleted, markAsInProgress, markAsPending } = useTasks();
  const { showSuccess, showError } = useToast();
  
  // Modal state management
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle edit task
  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  // Handle delete task
  const handleDelete = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  // Handle status change
  const handleStatusChange = async (taskId: string, status: TaskStatus) => {
    try {
      if (status === 'completed') {
        await markAsCompleted(taskId);
        showSuccess('Task marked as completed!');
      } else if (status === 'in-progress') {
        await markAsInProgress(taskId);
        showSuccess('Task marked as in progress!');
      } else if (status === 'pending') {
        await markAsPending(taskId);
        showSuccess('Task marked as pending!');
      }
    } catch (error) {
      // Error handling is done in the context and API interceptor
      const errorMessage = error instanceof Error ? error.message : 'Failed to update task status';
      showError(errorMessage);
    }
  };

  // Close modals and clear selected task
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 relative">
        {/* Header with Create Button */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-xl p-4 sm:p-6 shadow-xl">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Organize and track your work efficiently</p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
            aria-label="Create a new task"
            className="shadow-lg w-full sm:w-auto"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Task
          </Button>
        </header>

        {/* Loading State - Initial Load */}
        {isLoading && tasks.length === 0 ? (
          <div className="flex justify-center items-center h-64" role="status" aria-live="polite">
            <LoadingSpinner />
          </div>
        ) : (
          /* Task Board */
          <TaskBoard
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            filter={filter}
          />
        )}

        {/* Loading Overlay - During Operations */}
        {isLoading && tasks.length > 0 && (
          <div 
            className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10"
            role="status"
            aria-live="polite"
            aria-label="Loading tasks"
          >
            <LoadingSpinner size="lg" />
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        task={selectedTask}
      />
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        task={selectedTask}
      />
    </DashboardLayout>
  );
};
