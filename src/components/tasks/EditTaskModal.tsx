import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, Button, Input } from '../common';
import { taskSchema, type TaskFormData } from '../../utils/validation';
import { useTasks } from '../../hooks/useTasks';
import { useToast } from '../../contexts/ToastContext';
import type { Task } from '../../types';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, task }) => {
  const { updateTask } = useTasks();
  const { showSuccess, showError } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  // Pre-fill form with existing task data when task changes
  useEffect(() => {
    if (task) {
      setValue('title', task.title);
      setValue('description', task.description);
    }
  }, [task, setValue]);

  const onSubmit = async (data: TaskFormData) => {
    if (!task) return;

    try {
      await updateTask(task._id, {
        title: data.title,
        description: data.description,
      });
      showSuccess('Task updated successfully!');
      reset();
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update task';
      showError(errorMessage);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Task">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" aria-label="Edit task form">
        <Input
          id="edit-task-title"
          label="Title"
          type="text"
          placeholder="Enter task title"
          error={errors.title?.message}
          required
          aria-required="true"
          {...register('title')}
        />

        <div className="w-full">
          <label htmlFor="edit-task-description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="edit-task-description"
            placeholder="Enter task description"
            rows={4}
            className={`w-full px-3 py-2 min-h-[100px] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
              errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            aria-invalid={errors.description ? 'true' : 'false'}
            aria-describedby={errors.description ? 'edit-task-description-error' : undefined}
            required
            aria-required="true"
            {...register('description')}
          />
          {errors.description && (
            <p id="edit-task-description-error" className="mt-1 text-sm text-red-600" role="alert">
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
            aria-label="Cancel editing task"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={isSubmitting} 
            className="flex-1"
            aria-label={isSubmitting ? 'Updating task...' : 'Update task'}
          >
            Update Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};
