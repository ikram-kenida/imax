import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as typeSwiper } from "swiper/types";
import { Button } from "../ui/button";
import { useState } from "react";
import { Pagination } from "swiper/modules";
import { ProductCard } from "@/components/ProductCard";
import axiosClient from "@/axios";
import useSWR from "swr";
import { Product } from "@/types";
import { SkeletonProduct } from "../ui/SkeletonProduct";
import { useTranslation } from "react-i18next";

export const OtherProducts = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "productDetails",
  });
  const [swiper, setSwiper] = useState<typeSwiper>();
  const link = "/other-products";

  const fetcher = async () => {
    const response = await axiosClient.get(link);

    return response.data;
  };

  const { data, isLoading } = useSWR(link, fetcher);
  const { products }: { products: Product[] } = data ?? [];

  return (
    <section className="py-14">
      <div className="container">
        <div className="text-start">
          <h2 className="text-neutral-700 text-3xl font-semibold ps-5 relative before:absolute before:h-full before:w-1 before:rounded-xl before:bg-blue-600 before:top-0 before:start-0">
            {t("otherProducts")}
          </h2>
          <p className="text-black/60 text-lg font-medium capitalize mt-4">
            {t("exploreProducts")}
          </p>
        </div>
        <div className="relative">
          <Swiper
            dir="ltr"
            spaceBetween={24}
            slidesPerView={1}
            loop
            modules={[Pagination]}
            pagination={{ clickable: false }}
            onSwiper={(swiper) => setSwiper(swiper)}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1025: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="relative mt-20"
          >
            {isLoading &&
              [...Array(6)].map((_, index) => (
                <SwiperSlide key={index}>
                  <SkeletonProduct key={index} />
                </SwiperSlide>
              ))}
            {!isLoading &&
              products &&
              products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="hidden md:block">
            <Button
              onClick={() => swiper?.slidePrev()}
              className="absolute z-10 -translate-y-1/2 top-1/2 -left-12"
            >
              <img
                src="/icons/arrow-left.svg"
                alt="arrow left"
                width={24}
                height={44}
              />
            </Button>
            <Button
              onClick={() => swiper?.slideNext()}
              className="absolute z-10 -translate-y-1/2 top-1/2 -right-12"
            >
              <img
                src="/icons/arrow-right.svg"
                alt="arrow left"
                width={24}
                height={44}
              />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
