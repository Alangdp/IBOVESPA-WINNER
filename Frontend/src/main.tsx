import './index.css'
import React from 'react';

import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import { routes } from './routes/public.routes';
const root = createRoot(document.getElementById('root')!);

const DefaultToast = () => (
  <ToastContainer
    limit={4}
    stacked={true}
    position="bottom-right"
    pauseOnHover={false}
    pauseOnFocusLoss={false}
  />
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <DefaultToast />
      <RouterProvider router={createBrowserRouter([...routes])}  />
    </AuthProvider>
  </React.StrictMode>
);
