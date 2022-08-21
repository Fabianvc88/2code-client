import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth, isEmailIsVerified } from "../services/firebase";

export const AuthContext = createContext();

export function RequireAuth({ children }) {
  const { currentUser } = useContext(AuthContext);
  //const currentUser = useAuth();
  let location = useLocation();

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!isEmailIsVerified()) {
    return <Navigate to="/verifyEmail" replace />;
  }
  // if currentUser is found then we let them continue
  return children;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
