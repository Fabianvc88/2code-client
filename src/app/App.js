import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import About from "./pages/About";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register";
import Problems from "./pages/Problems";
import { RequireAuth, AuthContext, PublicRoutes } from "./contexts/authContext";
import Playground from "./pages/Playground";
import Problem from "./pages/Problem";
import CreateProblem from "./pages/CreateProblem";
import EditProblem from "./pages/EditProblem";
import React, { useEffect, useState } from "react";
import VerifyEmail from "./pages/VerifyEmail";
import AdminLogin from "./pages/AdminLogin";
import { auth } from "./services/firebase";
import { Main } from "./pages/Main";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  return (
    <React.StrictMode>
      <AuthContext.Provider value={{ currentUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />

              <Route element={<RequireAuth />}>
                <Route path="problems">
                  <Route index element={<Problems />} />
                  <Route path="newProblem" element={<CreateProblem />} />
                  <Route path="edit/:problemId" element={<EditProblem />} />
                </Route>

                <Route path="playground" element={<Playground />}>
                  <Route path=":problemId" element={<Problem />} />
                </Route>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="verifyEmail" element={<VerifyEmail />} />
            </Route>

            <Route element={<PublicRoutes />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="adminLogin" element={<AdminLogin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </React.StrictMode>
  );
}

export default App;
