import React from 'react';
import type { Task } from '../../types';
import { Button } from '../common';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (taskId: string, status: 'pending' | 'in-progress' | 'completed') => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-green-100 text-green-800 border-green-300',
  };

  const statusLabels = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
  };

  return (
    <article 
      className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
      aria-label={`Task: ${task.title}`}
    >
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[task.status]}`}
          role="status"
          aria-label={`Task status: ${statusLabels[task.status]}`}
        >
          {statusLabels[task.status]}
        </span>
      </div>

      {/* Task Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>

      {/* Task Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description}</p>

      {/* Status Change Buttons */}
      <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Change task status">
        {task.status !== 'pending' && (
          <button
            onClick={() => onStatusChange(task._id, 'pending')}
            className="text-xs px-3 py-2 min-h-[36px] bg-yellow-50 text-yellow-700 border border-yellow-300 rounded hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
            aria-label={`Mark task "${task.title}" as pending`}
          >
            Mark Pending
          </button>
        )}
        {task.status !== 'in-progress' && (
          <button
            onClick={() => onStatusChange(task._id, 'in-progress')}
            className="text-xs px-3 py-2 min-h-[36px] bg-blue-50 text-blue-700 border border-blue-300 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            aria-label={`Mark task "${task.title}" as in progress`}
          >
            Mark In Progress
          </button>
        )}
        {task.status !== 'completed' && (
          <button
            onClick={() => onStatusChange(task._id, 'completed')}
            className="text-xs px-3 py-2 min-h-[36px] bg-green-50 text-green-700 border border-green-300 rounded hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            aria-label={`Mark task "${task.title}" as completed`}
          >
            Mark Completed
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-3 border-t border-gray-200" role="group" aria-label="Task actions">
        <Button
          variant="secondary"
          onClick={() => onEdit(task)}
          className="flex-1 text-sm"
          aria-label={`Edit task "${task.title}"`}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => onDelete(task)}
          className="flex-1 text-sm"
          aria-label={`Delete task "${task.title}"`}
        >
          Delete
        </Button>
      </div>
    </article>
  );
};
