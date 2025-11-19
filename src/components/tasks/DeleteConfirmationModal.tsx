import React, { useState } from 'react';
import { Modal, Button } from '../common';
import { useTasks } from '../../hooks/useTasks';
import { useToast } from '../../contexts/ToastContext';
import type { Task } from '../../types';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const { deleteTask } = useTasks();
  const { showSuccess, showError } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    if (!task) return;

    try {
      setIsDeleting(true);
      await deleteTask(task._id);
      showSuccess('Task deleted successfully!');
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete task';
      showError(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Delete Task">
      <div className="space-y-4" role="alertdialog" aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0" aria-hidden="true">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 id="delete-dialog-title" className="text-base font-semibold text-gray-900 mb-2">
              Are you sure you want to delete this task?
            </h3>
            <div id="delete-dialog-description">
              <p className="text-sm text-gray-600 mb-2">
                You are about to delete the task:
              </p>
              <p className="text-sm font-medium text-gray-900 bg-gray-50 p-3 rounded border border-gray-200">
                {task.title}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4" role="group" aria-label="Confirmation actions">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            className="flex-1"
            disabled={isDeleting}
            aria-label="Cancel deletion"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleConfirm}
            className="flex-1"
            isLoading={isDeleting}
            aria-label={isDeleting ? 'Deleting task...' : `Confirm delete task "${task.title}"`}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
