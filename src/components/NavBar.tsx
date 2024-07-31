import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SelectLang } from "./SelectLang";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Overlay } from "./ui/overlay";
import { useTranslation } from "react-i18next";
import { useStateContext } from "@/contexts/ContextProvider";
import { Currencys } from "./Currencys";
import router from "@/router";

export const NavBar = () => {
  const { pathname } = useLocation();
  const [sidebar, setSidebar] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "header",
  });
  const { userToken } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");
  const sidebarLinks: any[] = t("sidebar", { returnObjects: true });
  const navlinks: any[] = t("navbar", { returnObjects: true });

  const toogleSidebar = () => {
    setSidebar(!sidebar);
    document.body.classList.toggle("overflow-hidden");
  };

  useEffect(() => {
    setSidebar(false);
    document.body.classList.remove("overflow-hidden");
  }, [pathname]);

  const handleSearchSubmit = () => {
    router.navigate(`/shop?search=${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <div className="xl:px-5 md:px-3 px-1">
      <nav className="relative flex justify-between items-center w-full bg-white py-2">
        <div className="flex items-center justify-between gap-8">
          <Link to="/">
            <img src="/images/logo.png" alt="logo" width={56} height={56} />
          </Link>
          <ul className="gap-6 md:flex hidden">
            {navlinks.map((nav) => (
              <li
                className={`text-sm uppercase py-1 relative ${
                  pathname == nav.path
                    ? "text-blue-600 font-bold before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-blue-600"
                    : "text-black/70 font-medium"
                }`}
                key={nav.name}
              >
                <Link to={nav.path}>{nav.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="relative xl:block hidden">
            <input
              type="text"
              name="search"
              id="search"
              className="w-[331px] h-[44px] p-3 pe-12 border-black/15 border rounded-lg text-sm"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="absolute top-1/2 end-0 -translate-y-1/2 h-full px-3 block ltr:rounded-tr-lg ltr:rounded-br-lg rtl:rounded-bl-lg rtl:rounded-tl-lg bg-blue-600"
            >
              <img
                src="/icons/search.svg"
                alt="search"
                width={20}
                height={20}
              />
            </button>
          </div>
          <div className="md:flex hidden gap-3">
            {userToken ? (
              <>
                <Button
                  className="bg-blue-600/20 min-w-5 min-h-5 p-3 rounded"
                  to="/profile#info"
                  title="Info"
                >
                  <img
                    src="/icons/user.svg"
                    alt="user"
                    width={20}
                    height={20}
                  />
                </Button>
                <Button
                  className="bg-blue-600/20 min-w-5 min-h-5 p-3 rounded"
                  to="/profile#wishlist"
                  title="Wishlist"
                >
                  <img
                    src="/icons/heart.svg"
                    alt="heart"
                    width={20}
                    height={20}
                  />
                </Button>
                <Button
                  className="bg-blue-600/20 min-w-5 min-h-5 p-3 rounded"
                  to="/cart"
                  title="Cart"
                >
                  <img
                    src="/icons/cart.svg"
                    alt="cart"
                    width={20}
                    height={20}
                  />
                </Button>
              </>
            ) : (
              <Button
                className="py-3 px-5 rounded bg-blue-600"
                to="/auth/login"
              >
                <span className="text-sm text-white font-semibold uppercase">
                  {t("login")}
                </span>
              </Button>
            )}
          </div>
          <SelectLang />
          <Currencys />
          <Button onClick={toogleSidebar} className="md:hidden">
            <img
              src="/icons/menu.svg"
              alt="menu"
              width={32}
              height={20}
              className="-scale-100"
            />
          </Button>
        </div>
      </nav>
      <aside
        className={cn(
          "md:hidden z-50 bg-blue-600 block fixed top-0 transition-all duration-500 w-[285px] h-full",
          sidebar ? "start-0" : "-start-full"
        )}
      >
        <Button className="absolute top-5 start-5" onClick={toogleSidebar}>
          <img src="/icons/xmark.svg" alt="xmark" width={14} height={15} />
        </Button>
        <div className="w-full min-h-[205px] flex items-center justify-center flex-col gap-3">
          <img src="/images/logo-2.png" alt="logo" width={107} height={83} />
          <h6 className="text-lg text-white font-medium">Imax Store</h6>
        </div>
        <ul className="mt-3">
          {sidebarLinks.length > 0 &&
            sidebarLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={cn(
                    "flex items-center justify-between px-3 py-5",
                    link.path == pathname ? "bg-white" : "bg-blue-600"
                  )}
                >
                  <span
                    className={cn(
                      "text-base font-semibold uppercase",
                      link.path == pathname ? "text-blue-600" : "text-white"
                    )}
                  >
                    {link.name}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      d="M10.1515 9.77658C10.3043 9.6238 10.3043 9.37611 10.1515 9.22334L7.06912 6.14092C6.76 5.8318 6.76 5.33062 7.06912 5.0215C7.37824 4.71238 7.87942 4.71238 8.18853 5.0215L12.0759 8.90889C12.4024 9.23533 12.4024 9.76459 12.0759 10.091L8.18853 13.9784C7.87942 14.2875 7.37824 14.2875 7.06912 13.9784C6.76 13.6693 6.76 13.1681 7.06912 12.859L10.1515 9.77658Z"
                      fill={cn(link.path == pathname ? "#0D8BFF" : "#fff")}
                    />
                  </svg>
                </Link>
              </li>
            ))}
        </ul>
      </aside>
      <Overlay
        onClick={toogleSidebar}
        open={sidebar}
        className="md:hidden block"
      />
    </div>
  );
};
