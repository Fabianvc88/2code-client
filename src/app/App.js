import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import About from "./pages/About";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register";
import Problems from "./pages/Problems";
import { AuthProvider, RequireAuth } from "./contexts/authContext";
import Playground from "./pages/Playground";
import Problem from "./pages/Problem";
import CreateProblem from "./pages/CreateProblem";
import EditProblem from "./pages/EditProblem";
import React from "react";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  const user = false;
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="problems"
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route index element={<Problems />} />
              <Route path="newProblem" element={<CreateProblem />} />
              <Route path="edit/:problemId" element={<EditProblem />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route
              path="dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="playground"
              element={
                <RequireAuth>
                  <Playground />
                </RequireAuth>
              }
            >
              <Route path=":problemId" element={<Problem />} />
            </Route>
            <Route
              path="login"
              element={user ? <Navigate to="dashboard" /> : <Login />}
            />
            <Route
              path="register"
              element={user ? <Navigate to="dashboard" /> : <Register />}
            />
            <Route path="verifyEmail" element={<VerifyEmail />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
