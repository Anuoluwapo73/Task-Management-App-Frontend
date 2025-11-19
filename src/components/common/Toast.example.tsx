/**
 * Toast Component Usage Examples
 * 
 * The Toast component displays temporary notification messages with auto-dismiss functionality.
 * It supports success, error, and info message types.
 * 
 * Requirements: 10.2 (success operations show confirmation), 10.3 (API errors display relevant messages)
 */

// Example 1: Using ToastProvider and useToast hook (Recommended)
// Wrap your app with ToastProvider in App.tsx or main.tsx:
/*
import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      <YourAppComponents />
    </ToastProvider>
  );
}
*/

// Then use the useToast hook in any component:
/*
import { useToast } from '../contexts/ToastContext';

function MyComponent() {
  const { showSuccess, showError, showInfo } = useToast();

  const handleSuccess = () => {
    showSuccess('Task created successfully!');
  };

  const handleError = () => {
    showError('Failed to create task. Please try again.');
  };

  const handleInfo = () => {
    showInfo('Loading your tasks...', 5000); // Custom duration
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
      <button onClick={handleInfo}>Show Info</button>
    </div>
  );
}
*/

// Example 2: Using Toast component directly (Advanced)
/*
import { useState } from 'react';
import { Toast } from './components/common';

function MyComponent() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div>
      <button onClick={() => setShowToast(true)}>Show Toast</button>
      {showToast && (
        <Toast
          message="Operation completed successfully!"
          type="success"
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
*/

// Example 3: Integration with API error handling
/*
import { useToast } from '../contexts/ToastContext';
import { taskService } from '../services/taskService';

function TaskForm() {
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (data: CreateTaskInput) => {
    try {
      await taskService.createTask(data);
      showSuccess('Task created successfully!');
    } catch (error) {
      showError('Failed to create task. Please try again.');
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
*/

export {};
