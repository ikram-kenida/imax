import { Button } from "@/components/ui/button";
import { ProductImage as TypeImage } from "@/types/Dashboard";
import { Dispatch, SetStateAction } from "react";

export const ProductImage = ({
  images,
  setImages,
}: {
  images: TypeImage[] | undefined;
  setImages: Dispatch<SetStateAction<TypeImage[] | undefined>>;
}) => {
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const validImageTypes = ["image/jpeg", "image/png"];

    if (!validImageTypes.includes(file.type)) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      const result = reader.result;
      if (result && typeof result === "string") {
        const imageData = { image: result };
        setImages((oldImages) =>
          oldImages ? [...oldImages, imageData] : [imageData]
        );
      } else if (result instanceof ArrayBuffer) {
        const convertedImage = arrayBufferToBase64(result);
        const imageData = { image: convertedImage };
        setImages((oldImages) =>
          oldImages ? [...oldImages, imageData] : [imageData]
        );
      }
      event.target.value = "";
    };
  };

  const deleteImage = (image: string) => {
    setImages((oldImages) => oldImages?.filter((item) => item.image !== image));
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const binary = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${binary}`;
  };

  return (
    <>
      <span className="text-stone-950 text-base font-semibold font-['Lato']">
        Upload Photos
      </span>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {images &&
          images.map((image) => (
            <div className="col-span-1" key={image.image}>
              <div className="w-full h-32 rounded-lg overflow-hidden relative">
                <img
                  src={image.image}
                  alt="image"
                  className="w-full h-32 object-contain"
                />
                <Button
                  className="absolute bottom-3 right-3 z-10 bg-white p-1.5 rounded-full"
                  onClick={() => deleteImage(image.image)}
                >
                  <img
                    src="/icons/delete.svg"
                    alt="delete image"
                    width={20}
                    height={24}
                    className="size-5"
                  />
                </Button>
              </div>
            </div>
          ))}
        <div className="col-span-1">
          <Button className="w-full h-32 px-4 py-3 bg-stone-50 rounded-lg border border-zinc-100 relative">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={onImageChange}
              accept=".png,.jpg,.jpeg"
            />
            <img src="/icons/add.svg" alt="add" />
          </Button>
        </div>
      </div>
    </>
  );
};
