import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import About from "./pages/About";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register";
import Problems from "./pages/Problems";
import { AuthProvider, RequireAuth } from "./contexts/authContext"; //<Route path="/editor" element={<Playground />} />
import Playground from "./pages/Playground";
import Problem from "./pages/Problem";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/playground"
            element={
              <RequireAuth>
                <Playground />
              </RequireAuth>
            }
          >
            <Route path=":problemId" element={<Problem />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
