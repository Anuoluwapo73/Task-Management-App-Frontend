import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, Button, Input } from '../common';
import { taskSchema, type TaskFormData } from '../../utils/validation';
import { useTasks } from '../../hooks/useTasks';
import { useToast } from '../../contexts/ToastContext';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose }) => {
  const { createTask } = useTasks();
  const { showSuccess, showError } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskFormData) => {
    try {
      await createTask({
        title: data.title,
        description: data.description,
      });
      showSuccess('Task created successfully!');
      reset();
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create task';
      showError(errorMessage);
      console.error('Error in CreateTaskModal:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Task">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" aria-label="Create task form">
        <Input
          id="create-task-title"
          label="Title"
          type="text"
          placeholder="Enter task title"
          error={errors.title?.message}
          required
          aria-required="true"
          {...register('title')}
        />

        <div className="w-full">
          <label htmlFor="create-task-description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="create-task-description"
            placeholder="Enter task description"
            rows={4}
            className={`w-full px-3 py-2 min-h-[100px] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
              errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            aria-invalid={errors.description ? 'true' : 'false'}
            aria-describedby={errors.description ? 'create-task-description-error' : undefined}
            required
            aria-required="true"
            {...register('description')}
          />
          {errors.description && (
            <p id="create-task-description-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-4" role="group" aria-label="Form actions">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleClose} 
            className="flex-1"
            aria-label="Cancel creating task"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={isSubmitting} 
            className="flex-1"
            aria-label={isSubmitting ? 'Creating task...' : 'Create task'}
          >
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};
