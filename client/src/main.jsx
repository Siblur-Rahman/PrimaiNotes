import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes';
import AuthProvider from './providers/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router}/>
        </HelmetProvider>
        <Toaster/>
    <ToastContainer></ToastContainer>
    </AuthProvider>
  </StrictMode>,
)
