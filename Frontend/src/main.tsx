import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { publicRoutes } from './public.routes'
import AuthProvider, { useAuth } from './contexts/AuthContext'



const { token } = useAuth()

createRoot(document.getElementById('root')!).render(

  <AuthProvider>
    <RouterProvider router={publicRoutes}  />
    <RouterProvider router={router}  />
  </AuthProvider>
)