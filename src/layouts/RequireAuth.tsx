import axiosClient from "@/axios";
import { Loading } from "@/components/ui/loading";
import { useStateContext } from "@/contexts/ContextProvider";
import router from "@/router";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  const { userToken, setCurrentUser, setUserToken } = useStateContext();
  const [loading, setLoading] = useState(true);

  if (!userToken) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  useEffect(() => {
    axiosClient
      .get("/profile")
      .then(({ data }) => {
        setCurrentUser(data.user);
      })
      .catch(() => {
        router.navigate("/auth/login");
        setUserToken("");
        setCurrentUser({});
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <Outlet />;
};

export default RequireAuth;
