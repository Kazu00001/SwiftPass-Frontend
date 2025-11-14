import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TeacherPage from './pages/TeacherPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  [
    { path: '/', element: <LoginPage /> },
    { path: '/HomePage', element: <HomePage /> },
    { path: '/TeacherPage', element: <TeacherPage /> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
          <RouterProvider router={router} />
  </StrictMode>
);