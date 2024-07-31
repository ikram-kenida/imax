import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { useState } from "react";
import { KeyedMutator } from "swr";
import axiosClient from "@/axios";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import { ProductDetails } from "@/types";
import { cn } from "@/lib/utils";
import { renderStars } from "@/lib/renderStars";
import { useTranslation } from "react-i18next";

type DataType = {
  review?: string;
  product_id?: number | string;
  rate: number;
};

export const Reviews = ({
  product,
  mutate,
}: {
  product: ProductDetails;
  mutate: KeyedMutator<any>;
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType>({
    product_id: product.id,
    rate: 1,
  });
  const { t } = useTranslation("translation", {
    keyPrefix: "productDetails",
  });

  const handleRatingSelect = (rating: number) => {
    setData({
      ...data,
      rate: rating,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosClient.post("/reviews", data);

      toast("Success!", {
        description: response.data.message || "Review added successfully",
        className: "bg-green-600 border-0",
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      mutate();
      setData({
        ...data,
        review: "",
        rate: 1,
      });
    } catch (error: any) {
      toast("Error!", {
        description: error.response?.data?.message || "An error occurred",
        className: "bg-red-600 border-0",
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-auto text-center inline-flex flex-col justify-center">
        <span className="text-neutral-800 text-4xl font-black font-['Cairo']">
          {product.rate}
        </span>
        <div className="mt-2 flex">
          {renderStars(parseFloat(product.rate.toString()), 24, 24)}
        </div>
      </div>
      <div className="mt-8">
        <ScrollArea
          className={cn(
            "w-full rounded-md border",
            product.reviews.length < 3 ? "max-h-80" : "h-80"
          )}
        >
          <ul className="flex flex-col border-y border-gray-200">
            {product.reviews &&
              product.reviews.map((review) => (
                <li
                  className="py-5 border-b last:border-none border-gray-200 flex gap-x-8 gap-4 items-start md:flex-row flex-col"
                  key={review.id}
                >
                  <div className="text-start">
                    <h6 className="text-gray-800 text-base font-semibold font-['Cairo'] capitalize">
                      {review.username}
                    </h6>
                    <div className="flex mt-2">
                      {renderStars(review.rate, 14, 14)}
                    </div>
                    <p className="text-gray-500 text-xs font-medium capitalize font-['Cairo']">
                      {review.date}
                    </p>
                  </div>
                  <div className="text-start flex-1">
                    <p className="text-gray-600 text-sm font-normal font-['Cairo'] mt-1">
                      {review.review}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </ScrollArea>
      </div>
      <form className="mt-9 lg:w-[689px] w-full" onSubmit={onSubmit}>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button onClick={() => handleRatingSelect(star)} key={star}>
              {data?.rate >= star ? (
                <img
                  src="/icons/star-2.svg"
                  alt="star"
                  width={40}
                  height={40}
                />
              ) : (
                <img
                  src="/icons/star-empty-2.svg"
                  alt="star"
                  width={40}
                  height={40}
                />
              )}
            </Button>
          ))}
        </div>

        <div className="mt-3">
          <label
            htmlFor="review"
            className="text-black/60 text-base font-medium capitalize"
          >
            {t("review")}
          </label>
          <textarea
            name="rate"
            id="rate"
            value={data?.review}
            onChange={(e) =>
              setData({
                ...data,
                review: e.target.value,
              })
            }
            placeholder="Enter Review"
            className="w-full py-3 mt-2 h-32 px-6 bg-neutral-100 rounded-md text-base text-gray-400 font-normal placeholder:text-base placeholder:text-gray-400 placeholder:font-normal"
          />
        </div>
        <Button
          type="submit"
          className="w-56 h-11 px-10 py-3 bg-blue-600 rounded-lg mt-6"
          disabled={loading}
        >
          <span className="text-white text-lg font-normal">
            {loading ? "Loading..." : "Send"}
          </span>
        </Button>
      </form>
    </>
  );
};
