import { Link, Navigate, Outlet } from "react-router-dom";
import { SelectLang } from "../components/SelectLang";
import { useStateContext } from "@/contexts/ContextProvider";

const LayoutGuest = () => {
  const { userToken } = useStateContext();

  if (userToken) return <Navigate to="/profile" />;

  return (
    <>
      <header className="w-full absolute py-2 left-0 z-10 xl:bg-transparent bg-blue-600">
        <div className="container">
          <nav className="flex justify-between items-center">
            <Link to="/" className="flex gap-1 items-center">
              <img
                src="/images/logo.png"
                alt="logo"
                width={56}
                height={56}
                loading="lazy"
              />
              <h3 className="text-white text-2xl font-bold">IMAX</h3>
            </Link>
            <SelectLang />
          </nav>
        </div>
      </header>
      <main className="w-full min-h-screen ">
        <section className="relative h-full w-full">
          <div className="flex flex-warp h-full">
            <div className="w-1/2 h-[950px] xl:flex justify-center items-center hidden bg-blue-600">
              <img src="/images/guest-image.png" alt="guest-image" width={500} height={500}/>
            </div>
            <div className="xl:w-1/2 w-full xl:h-[950px] min-h-screen flex flex-col items-center justify-center bg-gray-50 py-28">
              <Outlet />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LayoutGuest;
