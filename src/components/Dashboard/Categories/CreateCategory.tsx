import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormGroup } from "@/components/Dashboard/ui/FormGroup";
import { toast } from "sonner";
import axiosClient from "@/axios";
import { KeyedMutator } from "swr";
import { Button } from "@/components/ui/button";

export const CreateCategory = ({ mutate }: { mutate: KeyedMutator<any> }) => {
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (result && typeof result === "string") {
        const imageData = result;
        setImage(imageData);
      } else if (result instanceof ArrayBuffer) {
        const convertedImage = arrayBufferToBase64(result);
        const imageData = convertedImage;
        setImage(imageData);
      }
      event.target.value = "";
    };
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const binary = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${binary}`;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      category_en: formData.get("category_en"),
      category_ar: formData.get("category_ar"),
      category_fr: formData.get("category_fr"),
      image,
    };
    const target:any = event.target

    setLoading(true);

    axiosClient
      .post("/dashboard/categories", data)
      .then((response) => {
        toast("Success!", {
          description: response.data.message || "Category created successfully",
          className: "bg-green-600 border-0",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        mutate();
        setImage("");
        target.reset();
      })
      .catch((error) => {
        if (error.response.status == 422) {
          Object.keys(error.response.data.errors).forEach((key: string) => {
            error.response.data.errors[key].forEach((errorMessage: string) => {
              toast("Error validation failed " + key, {
                description: errorMessage,
                className: "bg-red-600 border-0",
                action: {
                  label: "Close",
                  onClick: () => {},
                },
              });
            });
          });
        } else {
          toast("Error!", {
            description: error.response?.data?.message || "An error occurred",
            className: "bg-red-600 border-0",
            action: {
              label: "Close",
              onClick: () => {},
            },
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button className="text-white bg-green-600 px-5 py-3 rounded-xl font-['Lato'] font-semibold">
          Add New Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[636px] bg-white">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>New Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 grid-cols-2 py-4">
            <div className="col-span-2">
              <span className="text-stone-950 text-base font-semibold font-['Lato']">
                Upload Photos
              </span>
              <div className="mt-2">
                {image ? (
                  <div className="w-20 h-32 rounded-lg overflow-hidden relative">
                    <img
                      src={image}
                      alt="image"
                      className="w-full h-32 object-contain"
                    />
                  </div>
                ) : (
                  <Button className="w-14 h-14 px-4 py-3 bg-stone-50 rounded-lg border border-zinc-100 relative">
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={onImageChange}
                    />
                    <img src="/icons/addGreen.svg" alt="add" />
                  </Button>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <FormGroup
                title="Category en"
                placeholder="Category en"
                name="category_en"
                type="text"
              />
            </div>
            <div className="col-span-1">
              <FormGroup
                title="Category fr"
                placeholder="Category fr"
                name="category_fr"
                type="text"
              />
            </div>
            <div className="col-span-2">
              <FormGroup
                title="Category ar"
                placeholder="Category ar"
                name="category_ar"
                type="text"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="px-5 py-3 bg-blue-600 rounded-xl disabled:opacity-60"
              disabled={loading}
            >
              <span className="text-white text-base font-normal">
                {loading ? "Loading..." : "Save changes"}
              </span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
