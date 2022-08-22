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
import { RequireAuth, AuthContext } from "./contexts/authContext";
import Playground from "./pages/Playground";
import Problem from "./pages/Problem";
import CreateProblem from "./pages/CreateProblem";
import EditProblem from "./pages/EditProblem";
import React, { useEffect, useState } from "react";
import VerifyEmail from "./pages/VerifyEmail";
import AdminLogin from "./pages/AdminLogin";
import { auth } from "./services/firebase";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  return (
    <React.StrictMode>
      {/* <AuthProvider> */}
      <AuthContext.Provider value={{ currentUser }}>
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
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verifyEmail" element={<VerifyEmail />} />
            <Route path="adminLogin" element={<AdminLogin />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
      {/* </AuthProvider> */}
    </React.StrictMode>
  );
}

export default App;
