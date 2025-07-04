import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PreferencesProvider } from './context/PreferencesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PreferencesProvider>
        <App />
      </PreferencesProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
