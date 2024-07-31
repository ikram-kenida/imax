import { useStateContext } from "@/contexts/ContextProvider";
import { TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import axiosClient from "@/axios";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

interface InfoProps {
  logout: () => void;
}

export const Info = ({ logout }: InfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, setCurrentUser } = useStateContext();
  const { t } = useTranslation("translation", {
    keyPrefix: "profile",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    axiosClient
      .post("/codes/redeem", {
        code: event.currentTarget.code.value,
      })
      .then((response) => {
        toast("Success!", {
          description: response.data.message || "Balance added successfully",
          className: "bg-green-600 border-0",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        setCurrentUser(response.data.user);
        setIsOpen(false);
      })
      .catch((error) => {
        toast("Error!", {
          description: error.response?.data?.message || "An error occurred",
          className: "bg-red-600 border-0",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <TabsContent value="info">
      <Toaster />
      <h3 className="text-neutral-700 text-3xl font-normal tracking-wide">
        {t("info")}
      </h3>
      <h4 className="text-neutral-700 mt-5 text-2xl font-normal tracking-wide">
        {t("details")}
      </h4>
      <div className="mt-7">
        <div className="relative">
          <span className="text-zinc-500 text-lg font-normal">{t("name")}</span>
          <h5 className="text-neutral-700 text-lg font-normal mt-2 capitalize">
            {currentUser.name}
          </h5>
        </div>
        <div className="w-full h-px bg-gray-200 my-5" />
        <div className="relative">
          <span className="text-zinc-500 text-lg font-normal">
            {t("email")}
          </span>
          <h5 className="text-neutral-700 text-lg font-normal mt-2">
            {currentUser.email}
          </h5>
        </div>
        <div className="w-full h-px bg-gray-200 my-5" />
        <div className="relative">
          <span className="text-zinc-500 text-lg font-normal">
            {t("balance")}
          </span>
          <h5 className="text-neutral-700 text-lg font-normal mt-2">
            {currentUser.balance}
          </h5>
          <Dialog onOpenChange={(open) => setIsOpen(open)} open={isOpen}>
            <DialogTrigger asChild>
              <Button className="w-5 h-5 absolute top-1/2 end-5">
                <img src="/icons/add.svg" alt="add" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white rounded-lg">
              <DialogHeader>
                <DialogTitle>{t("add balance")}</DialogTitle>
                <DialogDescription>
                  {t("balance description")}
                </DialogDescription>
              </DialogHeader>
              <form action="#" onSubmit={onSubmit}>
                <div className="grid grid-cols-4 items-center gap-4 py-4">
                  <Label htmlFor="code" className="text-right">
                    Code
                  </Label>
                  <Input
                    id="code"
                    className="col-span-3"
                    placeholder="Enter code"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="py-2 px-4 bg-blue-600 text-white text-base rounded-md disabled:opacity-60"
                  >
                    {loading ? "Loading..." : "Submit"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full h-px bg-gray-200 my-5" />
      </div>
      <div className="mt-8">
        <Button className="gap-4" onClick={logout}>
          <img src="/icons/logout.svg" alt="logout" width={22} height={22} />
          <span className="text-red-500 text-lg font-medium">
            {t("signout")}
          </span>
        </Button>
      </div>
    </TabsContent>
  );
};
