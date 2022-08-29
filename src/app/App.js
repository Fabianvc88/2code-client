import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import About from "./pages/About";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register";
import Problems from "./pages/Problems";
import {
  RequireAuth,
  AuthContext,
  PublicRoutes,
  AdminRoutes,
  DataContext,
} from "./contexts/authContext";
import Playground from "./pages/Playground";
import Problem from "./pages/Problem";
import CreateProblem from "./pages/CreateProblem";
import EditProblem from "./pages/EditProblem";
import React, { useEffect, useState } from "react";
import VerifyEmail from "./pages/VerifyEmail";
import AdminLogin from "./pages/AdminLogin";
import { auth } from "./services/firebase";
import { Main } from "./pages/Main";
import { fetchUserDataByEmail } from "./services/tocodeApi";
import UserManagement from "./pages/UserManagement";
import EditUser from "./pages/EditUser";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserDataByEmail(currentUser.email).then((data) => {
        setUserData(data);
      });
    }
  }, [currentUser]);

  return (
    <React.StrictMode>
      <AuthContext.Provider value={{ currentUser }}>
        <DataContext.Provider value={{ userData }}>
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

                  <Route path="playground" element={<Outlet />}>
                    <Route path=":problemId" element={<Problem />} />
                  </Route>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="admin" element={<AdminRoutes />}>
                    <Route path="users" element={<Outlet />}>
                      <Route index element={<UserManagement />} />
                      <Route path=":userid" element={<EditUser />} />
                    </Route>
                  </Route>
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              <Route element={<RequireAuth />}>
                <Route path="verifyEmail" element={<VerifyEmail />} />
              </Route>

              {/* <Route element={<PublicRoutes />}> */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="adminLogin" element={<AdminLogin />} />
              {/* </Route> */}
            </Routes>
          </BrowserRouter>
        </DataContext.Provider>
      </AuthContext.Provider>
    </React.StrictMode>
  );
}

export default App;
