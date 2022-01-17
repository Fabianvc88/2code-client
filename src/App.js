import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import About from './pages/About';
import NotFoundPage from './pages/NotFoundPage';

import { Outlet } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
/*<div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <div className="text-xl font-medium text-primary">ChitChat</div>
        <p className="text-blue-500">You have a new message!</p>
      </div>
    </div>*/