import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { FormGroup } from "../ui/FormGroup";
import { SelectCategory } from "./SelectCategory";
import { ProductImage } from "./ProductImage";
import {
  type ProductInfo as TypeProduct,
  type Product,
  type ProductImage as TypeImage,
  ProductPrice,
} from "@/types/Dashboard";
import { SelectType } from "./SelectType";

export const ProductInfo = ({
  setProduct,
  setActiveTab,
  product,
}: {
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
  product: Product | undefined;
}) => {
  const [images, setImages] = useState<TypeImage[] | undefined>(
    product?.images
  );
  const [categoryId, setCategoryId] = useState<string>(
    product?.category_id?.toString() ?? ""
  );
  const [type, setType] = useState(product?.type ?? "");
  const [price, setPrice] = useState<ProductPrice | undefined>(product?.prices);
  const [productInfo, setProductInfo] = useState<TypeProduct | undefined>(
    product ?? undefined
  );
  const [discount, setDiscount] = useState(price?.discount ?? 0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const product: TypeProduct = {
      title_en: formData.get("title_en")?.toString() ?? "",
      title_ar: formData.get("title_ar")?.toString() ?? "",
      title_fr: formData.get("title_fr")?.toString() ?? "",
      description_en: formData.get("description_en")?.toString() ?? "",
      description_fr: formData.get("description_fr")?.toString() ?? "",
      description_ar: formData.get("description_ar")?.toString() ?? "",
      category_id: categoryId,
      type,
    };

    const prices: ProductPrice = {
      usd: formData.get("price_usd")?.toString() ?? "",
      eur: formData.get("price_eur")?.toString() ?? "",
      egp: formData.get("price_egp")?.toString() ?? "",
      aed: formData.get("price_aed")?.toString() ?? "",
      dzd: formData.get("price_dzd")?.toString() ?? "",
      kwd: formData.get("price_kwd")?.toString() ?? "",
      sar: formData.get("price_sar")?.toString() ?? "",
      imx: formData.get("imx")?.toString() ?? "",
      discount,
    };
    setPrice(prices);

    setProductInfo(product);

    setProduct((old) =>
      old
        ? {
            ...old,
            ...product,
            images,
            prices,
          }
        : {
            ...product,
            images,
            prices,
          }
    );

    setActiveTab("item-2");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="px-6 py-6 bg-white rounded-3xl">
        <h5 className="text-neutral-400 text-lg font-semibold font-['Lato']">
          Main Info
        </h5>
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <ProductImage images={images} setImages={setImages} />
            </div>
            <div className="col-span-1">
              <SelectCategory
                setCategoryId={setCategoryId}
                categoryId={categoryId}
              />
            </div>
            <div className="col-span-1">
              <SelectType setType={setType} type={type} />
            </div>
            <div className="col-span-1">
              <FormGroup
                title="Title"
                type="text"
                placeholder="Title"
                name="title_en"
                value={productInfo?.title_en}
              />
            </div>
            <div className="col-span-1">
              <FormGroup
                title="titre"
                type="text"
                placeholder="titre"
                name="title_fr"
                value={productInfo?.title_fr}
              />
            </div>
            <div className="col-span-2">
              <FormGroup
                title="العنوان"
                type="text"
                placeholder="العنوان"
                dir="rtl"
                name="title_ar"
                value={product?.title_ar}
              />
            </div>
            <div className="col-span-2">
              <FormGroup
                type="textarea"
                title="Description"
                name="description_en"
                placeholder="Description"
                value={productInfo?.description_en}
              />
            </div>
            <div className="col-span-2">
              <FormGroup
                type="textarea"
                title="Description fr"
                name="description_fr"
                placeholder="Description"
                value={productInfo?.description_fr}
              />
            </div>
            <div className="col-span-2">
              <FormGroup
                type="textarea"
                title="الوصف"
                name="description_ar"
                placeholder="الوصف"
                dir="rtl"
                value={productInfo?.description_ar}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-6 bg-white rounded-3xl mt-6">
        <h5 className="text-neutral-400 text-lg font-semibold font-['Lato']">
          Prices
        </h5>
        <div className="mt-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <FormGroup
                title="Price USD"
                type="number"
                placeholder="USD"
                name="price_usd"
                value={price?.usd}
              />
            </div>
            <div className="col-span-1">
              <FormGroup
                title="Price AED"
                type="number"
                placeholder="AED"
                name="price_aed"
                value={price?.aed}
              />
            </div>
            <div className="col-span-1">
              <FormGroup
                title="Price DZD"
                type="number"
                placeholder="DZD"
                name="price_dzd"
                value={price?.dzd}
              />
            </div>
            <div className="col-span-1">
              <FormGroup
                title="Price EGP"
                type="number"
                placeholder="EGP"
                name="price_egp"
                value={price?.egp}
              />
            </div>
            <div className="col-span-1">
              <FormGroup
                title="Price EUR"
                type="number"
                placeholder="EUR"
                name="price_eur"
                value={price?.eur}
              />
            </div>
            <div className="col-span-1">
              <FormGroup
                title="Price KWD"
                type="number"
                placeholder="KWD"
                name="price_kwd"
                value={price?.kwd}
              />
            </div>
            <div className="col-span-1">
              <FormGroup
                title="Price SAR"
                type="number"
                placeholder="SAR"
                name="price_sar"
                value={price?.sar}
              />
            </div>
            <div className="col-span-1">
              <FormGroup
                title="Price IMX"
                type="number"
                placeholder="IMX"
                name="imx"
                value={price?.imx}
              />
            </div>
            <div className="col-span-1">
              <FormGroup
                title="Discount"
                type="number"
                placeholder="Discount"
                name="discount"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <Button type="submit" className="bg-blue-600 px-5 py-3 rounded-xl w-40">
          <span className="text-white font-semibold font-['Lato']">
            Save & Continue
          </span>
        </Button>
        <Button
          type="submit"
          className="w-20 px-5 py-3 rounded-xl border border-stone-950"
        >
          <span className="text-stone-950 font-semibold font-['Lato']">
            Next
          </span>
        </Button>
      </div>
    </form>
  );
};
