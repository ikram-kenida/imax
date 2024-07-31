import axiosClient from "@/axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { toast } from "sonner";
import { KeyedMutator } from "swr";
import { FormGroup } from "../ui/FormGroup";

export const SendOrder = ({
  email,
  mutate,
  id,
}: {
  email: string;
  mutate: KeyedMutator<any>;
  id?: string | number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    axiosClient
      .post("/dashboard/orders/send/" + id, {
        message: event.currentTarget.message.value,
      })
      .then((response) => {
        toast("Success!", {
          description: response.data.message || "Successfully sent",
          className: "bg-green-600 border-0",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        mutate();
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
    <>
      <Toaster />
      <Dialog onOpenChange={(open) => setIsOpen(open)} open={isOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-600 px-5 py-3 rounded-xl">
            <span className="text-white font-semibold text-base font-['Lato']">
              Send Order
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-lg">
          <DialogHeader>
            <DialogTitle>Send Order</DialogTitle>
            <DialogDescription>Send Order to user {email}</DialogDescription>
          </DialogHeader>
          <form action="#" onSubmit={onSubmit}>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-right">
                  Email
                </Label>
                <Input id="code" className="w-full" value={email} disabled />
              </div>
              <FormGroup
                title="Message"
                name="message"
                placeholder="Enter message"
                type="textarea"
              />
            </div>
            <DialogFooter className="mt-5">
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
    </>
  );
};
