import { useState, useEffect } from 'react';
import TodoList from './components/ToDoList';
import Login from './auth/Login'
import './index.css';
import { Toaster } from 'react-hot-toast';
import { axiosInstance } from './api/axiosConfig';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/auth/check')
      .then((res) => {
        setIsLoggedIn(res.data.authenticated);
      })

      .catch(() => setIsLoggedIn(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Checking authentication...</p>;

  return (
    <div data-theme="synthwave" className="min-h-screen flex flex-col bg-base-100">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="p-6">
        <h1 className="text-4xl font-bold text-left mb-4">📝 To-Do List</h1>
      </header>

      {/* Main Content */}
      <main className="min-w-screen flex flex-grow overflow-hidden">
        {isLoggedIn ?
          <TodoList setIsLoggedIn={setIsLoggedIn} />
          : <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        }
      </main>
    </div>
  );
}

export default App;
