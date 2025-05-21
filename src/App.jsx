import React from 'react';
import TodoList from './components/ToDoList';
import './index.css';
import QuoteCard from './components/QuoteCard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div data-theme="synthwave" className="min-h-screen flex flex-col bg-base-100">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="p-6">
        <h1 className="text-4xl font-bold text-left mb-4">📝 To-Do List</h1>
      </header>

      {/* Main Content: Full-width horizontal split */}
      <main className="min-w-screen flex flex-grow overflow-hidden">
        <TodoList />
      </main>
    </div>
  );
}

export default App;
