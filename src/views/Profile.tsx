import { useStateContext } from "@/contexts/ContextProvider";
import { useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Info } from "@/components/Profile/Info";
import { Orders } from "@/components/Profile/Orders";
import { Wishlist } from "@/components/Profile/Wishlist";
import { ChangePassword } from "@/components/Profile/ChangePassword";
import { Button } from "@/components/ui/button";
import axiosClient from "@/axios";
import router from "@/router";
import { PageTitle } from "@/components/ui/page-title";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { currentUser, setCurrentUser, setUserToken } = useStateContext();
  const { hash } = useLocation();
  const tab = hash.slice(1);
  const [activeTab, setActiveTab] = useState(tab != "" ? tab : "info");
  const { i18n, t } = useTranslation("translation", {
    keyPrefix: "profile",
  });

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    window.location.hash = value;
  };

  const logout = () => {
    axiosClient.post("/logout").then(() => {
      setCurrentUser({});
      setUserToken("");
      router.navigate("/");
    });
  };

  return (
    <>
      <PageTitle page="Profile" />
      <section className="pt-7 pb-20">
        <div className="container">
          <div className="mt-12">
            <h2 className="text-4xl font-normal capitalize text-neutral-700 ps-5 relative before:absolute before:h-full before:w-2 before:rounded-xl before:bg-blue-600 before:top-0 before:start-0">
              {t("hello")} {currentUser.name?.split(" ")[0]}
            </h2>
            <p className="text-zinc-500 text-sm font-normal leading-[33.50px] tracking-tight mt-1">
              {t("welcome")}
            </p>
            <Tabs
              defaultValue={activeTab}
              className="flex flex-wrap gap-14 items-start mt-2"
              dir={i18n.language == "ar" ? "rtl" : "ltr"}
            >
              <div className="xl:w-[295px] w-full">
                <TabsList className="flex xl:flex-col flex-row md:gap-5 gap-2 justify-start *:flex-auto *:w-auto">
                  <TabsTrigger
                    value="info"
                    className="flex gap-4 xl:data-[state=active]:bg-blue-600/15 before:absolute before:top-0 before:start-0 before:h-full before:w-[2px] before:bg-blue-600 before:hidden xl:data-[state=active]:before:block xl:ps-12"
                    onClick={() => handleTabClick("info")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="md:block hidden"
                    >
                      <path
                        d="M9.99998 11.6667C12.3012 11.6667 14.1666 9.80123 14.1666 7.50004C14.1666 5.19885 12.3012 3.33337 9.99998 3.33337C7.69879 3.33337 5.83331 5.19885 5.83331 7.50004C5.83331 9.80123 7.69879 11.6667 9.99998 11.6667ZM9.99998 11.6667C6.31808 11.6667 3.33331 13.9053 3.33331 16.6667M9.99998 11.6667C13.6819 11.6667 16.6666 13.9053 16.6666 16.6667"
                        className={cn(
                          activeTab == "info"
                            ? "stroke-blue-600"
                            : "stroke-zinc-500"
                        )}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span
                      className={cn(
                        "md:text-lg text-base font-normal",
                        activeTab == "info" ? "text-blue-600" : "text-zinc-500"
                      )}
                    >
                      {t("info")}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="orders"
                    className="flex gap-4 xl:data-[state=active]:bg-blue-600/15 before:absolute before:top-0 before:start-0 before:h-full before:w-[2px] before:bg-blue-600 before:hidden xl:data-[state=active]:before:block xl:ps-12"
                    onClick={() => handleTabClick("orders")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      className="md:block hidden"
                    >
                      <path
                        d="M15.5833 8.39478L15.5138 7.45773C15.4501 6.59933 14.7083 5.93425 13.8146 5.93425H11.9937M5.5 17.4167H4.45365C3.465 17.4167 2.68398 16.609 2.75442 15.6595L3.36283 7.45773C3.42651 6.59933 4.16831 5.93425 5.06207 5.93425H6.88298M6.88298 5.93425V4.2939C6.88298 2.93499 8.02705 1.83337 9.43833 1.83337C10.8496 1.83337 11.9937 2.93499 11.9937 4.2939V5.93425M6.88298 5.93425H11.9937M15.5833 13.75C15.5833 14.7626 14.7625 15.5834 13.75 15.5834C12.7375 15.5834 11.9167 14.7626 11.9167 13.75M10.0833 19.25H17.4167C18.4292 19.25 19.25 18.4292 19.25 17.4167V12.8334C19.25 11.8209 18.4292 11 17.4167 11H10.0833C9.07081 11 8.25 11.8209 8.25 12.8334V17.4167C8.25 18.4292 9.07081 19.25 10.0833 19.25Z"
                        className={cn(
                          activeTab == "orders"
                            ? "stroke-blue-600"
                            : "stroke-zinc-500"
                        )}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span
                      className={cn(
                        "md:text-lg text-base font-normal",
                        activeTab == "orders"
                          ? "text-blue-600"
                          : "text-zinc-500"
                      )}
                    >
                      {t("orders")}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="wishlist"
                    className="flex gap-4 xl:data-[state=active]:bg-blue-600/15 before:absolute before:top-0 before:start-0 before:h-full before:w-[2px] before:bg-blue-600 before:hidden xl:data-[state=active]:before:block xl:ps-12"
                    onClick={() => handleTabClick("wishlist")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="md:block hidden"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.99486 4.93017C8.49535 3.18265 5.99481 2.71258 4.11602 4.31278C2.23723 5.91298 1.97273 8.58843 3.44815 10.481C4.67486 12.0545 8.38733 15.3732 9.60407 16.4474C9.7402 16.5676 9.80827 16.6276 9.88766 16.6513C9.95695 16.6719 10.0328 16.6719 10.1021 16.6513C10.1815 16.6276 10.2495 16.5676 10.3857 16.4474C11.6024 15.3732 15.3149 12.0545 16.5416 10.481C18.017 8.58843 17.7848 5.89614 15.8737 4.31278C13.9626 2.72941 11.4944 3.18265 9.99486 4.93017Z"
                        className={cn(
                          activeTab == "wishlist"
                            ? "stroke-blue-600"
                            : "stroke-zinc-500"
                        )}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className={cn(
                        "md:text-lg text-base font-normal",
                        activeTab == "wishlist"
                          ? "text-blue-600"
                          : "text-zinc-500"
                      )}
                    >
                      {t("wishlist")}
                    </span>
                  </TabsTrigger>
                  {!currentUser.social_status && (
                    <TabsTrigger
                      value="change-password"
                      className="flex gap-4 xl:data-[state=active]:bg-blue-600/15 before:absolute before:top-0 before:start-0 before:h-full before:w-[2px] before:bg-blue-600 before:hidden xl:data-[state=active]:before:block xl:ps-12"
                      onClick={() => handleTabClick("change-password")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="md:block hidden"
                      >
                        <path
                          d="M12 5.33329H11.3334V3.99996C11.3334 2.15996 9.84002 0.666626 8.00002 0.666626C6.16002 0.666626 4.66669 2.15996 4.66669 3.99996V5.33329H4.00002C3.26669 5.33329 2.66669 5.93329 2.66669 6.66663V13.3333C2.66669 14.0666 3.26669 14.6666 4.00002 14.6666H12C12.7334 14.6666 13.3334 14.0666 13.3334 13.3333V6.66663C13.3334 5.93329 12.7334 5.33329 12 5.33329ZM8.00002 11.3333C7.26669 11.3333 6.66669 10.7333 6.66669 9.99996C6.66669 9.26663 7.26669 8.66663 8.00002 8.66663C8.73335 8.66663 9.33335 9.26663 9.33335 9.99996C9.33335 10.7333 8.73335 11.3333 8.00002 11.3333ZM10.0667 5.33329H5.93335V3.99996C5.93335 2.85996 6.86002 1.93329 8.00002 1.93329C9.14002 1.93329 10.0667 2.85996 10.0667 3.99996V5.33329Z"
                          className={cn(
                            activeTab == "change-password"
                              ? "fill-blue-600"
                              : "fill-zinc-500"
                          )}
                        />
                      </svg>
                      <span
                        className={cn(
                          "md:text-lg text-base font-normal",
                          activeTab == "change-password"
                            ? "text-blue-600"
                            : "text-zinc-500"
                        )}
                      >
                        {t("change")}
                      </span>
                    </TabsTrigger>
                  )}
                  <Button
                    className="gap-4 xl:ps-12 justify-start md:flex hidden"
                    onClick={logout}
                  >
                    <img
                      src="/icons/logout.svg"
                      alt="logout"
                      width={22}
                      height={22}
                    />
                    <span className="text-red-500 text-lg font-medium">
                      {t("signout")}
                    </span>
                  </Button>
                </TabsList>
              </div>
              <div className="grow">
                <Info logout={logout} />
                <Orders />
                <Wishlist />
                {!currentUser.social_status && <ChangePassword />}{" "}
              </div>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
