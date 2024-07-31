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
import { ProductCategory } from "@/types/Dashboard";
import { HashLoader } from "react-spinners";

export const UpdateCategory = ({
  category,
  mutate,
}: {
  category: ProductCategory;
  mutate: KeyedMutator<any>;
}) => {
  const [image, setImage] = useState<string | null>(category.image);
  const [loading, setLoading] = useState(false);

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

  const deleteImage = () => {
    setImage(null);
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
    setLoading(true);

    axiosClient
      .put("/dashboard/categories/" + category.id, data)
      .then(() => {
        toast("Update product", {
          description: "Product Updated successfully",
          className: "bg-green-600 border-0",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        mutate();
      })
      .catch((error) => {
        if (error && error.response && error.response.status == 422) {
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
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white bg-green-600 px-5 py-3 rounded-xl font-['Lato'] font-semibold">
          Edit Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-h-[456px] md:max-w-[636px] bg-white">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <HashLoader color="#1577EB" />
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Update Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 grid-cols-2 py-4">
              <div className="col-span-2">
                <span className="text-stone-950 text-base font-semibold font-['Lato']">
                  Upload Photos
                </span>
                <div className="mt-2">
                  {image ? (
                    <div className="w-20 h-20 rounded-lg overflow-hidden relative">
                      <img
                        src={image}
                        alt="image"
                        className="w-full h-32 object-contain"
                      />
                      <Button
                        className="absolute bottom-2 right-2 z-10 bg-white p-1 rounded-full"
                        onClick={deleteImage}
                      >
                        <img
                          src="/icons/delete.svg"
                          alt="delete image"
                          width={15}
                          height={15}
                          className="size-4"
                        />
                      </Button>
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
                  value={category?.category_en}
                />
              </div>
              <div className="col-span-1">
                <FormGroup
                  title="Category fr"
                  placeholder="Category fr"
                  name="category_fr"
                  type="text"
                  value={category?.category_fr}
                />
              </div>
              <div className="col-span-2">
                <FormGroup
                  title="Category ar"
                  placeholder="Category ar"
                  name="category_ar"
                  type="text"
                  value={category?.category_ar}
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
                  {loading ? "Loading..." : "Update"}
                </span>
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
