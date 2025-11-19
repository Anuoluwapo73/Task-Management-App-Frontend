import React from 'react';
import type { Task, TaskStatus } from '../../types';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
  status,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const statusConfig = {
    pending: {
      title: 'Pending',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
    },
    'in-progress': {
      title: 'In Progress',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
    },
    completed: {
      title: 'Completed',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
    },
  };

  const config = statusConfig[status];
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <section className="flex flex-col h-full" aria-labelledby={`${status}-heading`}>
      {/* Column Header */}
      <div
        className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-5 mb-4 shadow-lg`}
      >
        <h2 
          id={`${status}-heading`}
          className={`text-lg font-bold ${config.textColor} flex items-center justify-between`}
        >
          <span>{config.title}</span>
          <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm" aria-label={`${filteredTasks.length} tasks`}>
            {filteredTasks.length}
          </span>
        </h2>
      </div>

      {/* Task Cards */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-1" role="list" aria-label={`${config.title} tasks`}>
        {filteredTasks.map((task) => (
          <div key={task._id} role="listitem">
            <TaskCard
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
