import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
/*<div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <div className="text-xl font-medium text-primary">ChitChat</div>
        <p className="text-blue-500">You have a new message!</p>
      </div>
    </div>*/