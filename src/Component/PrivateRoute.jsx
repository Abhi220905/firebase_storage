import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const PrivateRoute = () => {
  const [isAuth, setAuth] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuth(user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuth === undefined) {
    return null;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
