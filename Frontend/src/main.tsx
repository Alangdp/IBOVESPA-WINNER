import './index.css'
import React from 'react';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.router';
import AuthProvider from './contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';
const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}  />
    </AuthProvider>
  </React.StrictMode>
);
