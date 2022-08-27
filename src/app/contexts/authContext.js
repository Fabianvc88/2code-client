import React, { createContext, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import VerifyEmail from "../pages/VerifyEmail";
import { isEmailIsVerified } from "../services/firebase";

export const AuthContext = createContext();
export const DataContext = createContext();

export function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" replace={true} />;
  } else if (currentUser && !isEmailIsVerified()) {
    return <VerifyEmail />;
  } else {
    return <Outlet />;
  }
}

export function PublicRoutes() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Outlet />;
  }
  // else if (currentUser && !isEmailIsVerified()) {
  //   return <VerifyEmail />;
  // }
  else {
    return <Navigate to="/dashboard" replace={true} />;
  }
}

export function AdminRoutes() {
  const { userData } = useContext(DataContext);

  if (userData.role !== "admin") {
    return <Navigate to="/dashboard" replace={true} />;
  } else {
    return <Outlet />;
  }
}

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     auth.onAuthStateChanged((user) => setCurrentUser(user));
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
