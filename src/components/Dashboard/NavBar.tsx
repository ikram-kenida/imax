import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Dispatch, SetStateAction } from "react";
import { Notification } from "@/types";
import axiosClient from "@/axios";

export const NavBar = ({
  setIsOpen,
  notifications,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  notifications: Notification[];
}) => {
  const markAsRead = () => {
    axiosClient.post("/dashboard/notifications/mark-as-read");
  };

  let count = 0;

  notifications &&
    notifications.map((item) => {
      if (!item.read) {
        count++;
      }
    });

  return (
    <nav className="flex items-center justify-between w-full py-8 bg-white pr-14">
      <div className="flex items-center gap-7">
        <Button
          className="w-9 h-9 p-1 flex-col items-start gap-1.5"
          onClick={() => setIsOpen((isOpen: boolean) => !isOpen)}
        >
          <span className="w-7 h-0.5 bg-blue-600 rounded-2xl"></span>
          <span className="self-stretch h-0.5 bg-blue-600 rounded-2xl"></span>
          <span className="w-7 h-0.5 bg-blue-600 rounded-2xl"></span>
        </Button>
        <div className="relative hidden xl:block">
          <input
            type="text"
            name=""
            id=""
            className="w-[331px] h-9 pl-3 pe-12 border-black/15 border rounded-lg text-sm"
            placeholder="Search"
          />
          <button
            type="button"
            className="absolute block h-full px-3 -translate-y-1/2 bg-blue-600 top-1/2 end-0 ltr:rounded-tr-lg ltr:rounded-br-lg rtl:rounded-bl-lg rtl:rounded-tl-lg"
          >
            <img src="/icons/search.svg" alt="search" width={20} height={20} />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <DropdownMenu onOpenChange={(open) => open && markAsRead()}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              className="relative w-12 h-12 p-2 rounded-full bg-indigo-50"
            >
              <img
                src="/icons/notification.svg"
                alt="notification"
                width={24}
                height={24}
              />
              <span className="absolute top-1 right-2.5 bg-blue-600 text-white size-5 rounded-full">
                {count}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="h-48 px-3 pt-4 pb-3 bg-white shadow w-80 rounded-xl">
            <DropdownMenuLabel>
              <span className="text-stone-800 text-sm font-semibold font-['Lato']">
                Notifications
              </span>
            </DropdownMenuLabel>
            <ScrollArea className="flex flex-col gap-4 mt-3 h-44">
              {notifications &&
                notifications.map((notification) => (
                  <DropdownMenuItem
                    className="flex flex-col items-start justify-start gap-1"
                    key={notification.id}
                  >
                    <h5 className="text-stone-800 text-xs font-semibold font-['Lato']">
                      {notification.title}
                    </h5>
                    <p className="text-neutral-500 text-xs font-semibold font-['Lato']">
                      {notification.message}
                    </p>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-neutral-500 text-xs font-semibold font-['Lato']">
                        {notification.user_name}
                      </span>
                      <span className="text-neutral-500 text-xs font-semibold font-['Lato']">
                        {notification.date}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="w-24 h-9 px-4 py-2 rounded-2xl border border-zinc-100 justify-center items-center gap-2.5 flex">
          <span className="text-stone-950 text-base font-medium font-['Lato']">
            IMAX
          </span>
        </Button>
      </div>
    </nav>
  );
};
