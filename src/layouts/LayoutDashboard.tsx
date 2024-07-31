import axiosClient from "@/axios";
import { NavBar } from "@/components/Dashboard/NavBar";
import { SideBar } from "@/components/Dashboard/SideBar";
import { Loading } from "@/components/ui/loading";
import { useStateContext } from "@/contexts/ContextProvider";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";
import useSWR from "swr";

const LayoutDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { i18n } = useTranslation();
  const { setCurrentUser, userToken } = useStateContext();
  const link = "/dashboard/admin";

  if (!userToken) return <Navigate to="/404" />;

  useEffect(() => {
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
    i18n.changeLanguage("en");
  }, []);

  const fetcher = async () => {
    const response = await axiosClient.get("/dashboard/admin");

    return response.data;
  };

  const { data, isLoading, error } = useSWR(link, fetcher);
  const { notifications } = data ?? [];

  useEffect(() => {
    if (data) {
      setCurrentUser(data.user);
    }
  }, [data]);

  if (error) {
    return <Navigate to="/404" />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex w-full">
        <aside
          className={cn(
            "fixed top-0 left-0 h-full min-h-screen overflow-hidden transition-all duration-500 w-20",
            isOpen
              ? "animate-in [--tw-enter-translate-x=80px] w-72"
              : "animate-out [--tw-enter-translate-x=288px] w-20"
          )}
        >
          <SideBar isOpen={isOpen} />
        </aside>
        <header
          className={cn(
            "fixed top-0 right-0 z-50 transition-all duration-500",
            isOpen ? "w-[calc(100%-288px)]" : "w-[calc(100%-80px)]"
          )}
        >
          <NavBar setIsOpen={setIsOpen} notifications={notifications} />
        </header>
        <div
          className={cn(
            "flex-1 pr-3 mt-[112px] transition-all duration-500",
            isOpen ? "ml-72" : "ml-20"
          )}
        >
          <main className="w-full min-h-screen p-8 bg-indigo-50 rounded-3xl">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default LayoutDashboard;
