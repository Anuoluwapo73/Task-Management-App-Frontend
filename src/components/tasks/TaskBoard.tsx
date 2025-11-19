import React from 'react';
import type { Task, TaskStatus } from '../../types';
import { TaskColumn } from './TaskColumn';

interface TaskBoardProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  filter?: 'all' | 'pending' | 'in-progress' | 'completed';
}

export const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  filter,
}) => {
  // Filter tasks based on the filter prop
  const filteredTasks = filter && filter !== 'all' 
    ? tasks.filter(task => task.status === filter)
    : tasks;

  // Handle empty state
  if (filteredTasks.length === 0) {
    return (
      <div 
        className="flex items-center justify-center h-96 bg-white rounded-xl border-2 border-dashed border-gray-300 shadow-lg"
        role="status"
        aria-label="No tasks available"
      >
        <div className="text-center p-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No tasks yet</h3>
          <p className="text-gray-600 mb-6">Start organizing your work by creating your first task!</p>
          <div className="inline-flex items-center gap-2 text-sm text-blue-600 font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Click "Create Task" to get started
          </div>
        </div>
      </div>
    );
  }

  // Show all three columns for dashboard or "all" filter
  if (!filter || filter === 'all') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full" role="region" aria-label="Task board">
        <TaskColumn
          status="pending"
          tasks={tasks}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
        <TaskColumn
          status="in-progress"
          tasks={tasks}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
        <TaskColumn
          status="completed"
          tasks={tasks}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      </div>
    );
  }

  // Show single column for specific status filter
  return (
    <div className="max-w-2xl mx-auto" role="region" aria-label="Task board">
      <TaskColumn
        status={filter as TaskStatus}
        tasks={tasks}
        onEdit={onEdit}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />
    </div>
  );
};
