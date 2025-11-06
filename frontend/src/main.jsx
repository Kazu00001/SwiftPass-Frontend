import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import TeacherPage from './pages/TeacherPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/TeacherPage" element={<TeacherPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
