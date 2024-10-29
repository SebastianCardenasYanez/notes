import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import LoginView from './components/login.jsx';
import SignUpView from './components/signup.jsx';
import WelcomeView from './components/wellcome.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeView />} />
        <Route path="/signup" element={<SignUpView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/home" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
