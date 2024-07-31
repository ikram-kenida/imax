import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as typeSwiper } from "swiper/types";
import { Button } from "../ui/button";
import { useState } from "react";
import { Pagination } from "swiper/modules";
import { ProductCard } from "@/components/ProductCard";
import { useTranslation } from "react-i18next";
import { Product } from "@/types";
import useSWR from "swr";
import axiosClient from "@/axios";
import { SkeletonProduct } from "../ui/SkeletonProduct";

export const FeaturedProducts = () => {
  const [swiper, setSwiper] = useState<typeSwiper>();
  const { t } = useTranslation("translation", {
    keyPrefix: "home.section-4",
  });

  const link = "/featured-products";

  const fetcher = async () => {
    const response = await axiosClient.get(link);

    return response.data;
  };

  const { data, isLoading } = useSWR(link, fetcher);
  const { products }: { products: Product[] } = data ?? [];

  return (
    <section className="relative py-14 bg-blue-600 bg-opacity-[0.08]">
      <div className="container">
        <div className="text-start">
          <h2 className="lg:text-5xl md:text-4xl text-3xl text-neutral-900 font-semibold ps-5 relative before:absolute before:h-full before:w-2 before:rounded-xl before:bg-blue-600 before:top-0 before:start-0">
            {t("title")}
          </h2>
          <p className="mt-4 text-black/60 md:text-2xl text-xl">
            {t("description")}
          </p>
        </div>
        <div className="relative">
          <Swiper
            dir="ltr"
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
          <div className="hidden xl:block">
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
