import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as TypeSwiper } from "swiper/types";
import { Button } from "../ui/button";
import { useState } from "react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import axiosClient from "@/axios";
import useSWR from "swr";
import { Category } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";

export const FeaturedCategories = () => {
  const [swiper, setSwiper] = useState<TypeSwiper>();
  const { t, i18n } = useTranslation("translation", {
    keyPrefix: "home.section-2",
  });
  const link = "/categories";

  const fetcher = async () => {
    const response = await axiosClient.get(link);

    return response.data;
  };

  const { data, isLoading } = useSWR(link, fetcher);
  const { categories }: { categories: Category[] } = data ?? [];

  return (
    <section className="relative py-14 bg-black bg-opacity-[0.03]">
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
            spaceBetween={24}
            slidesPerView={1}
            loop
            dir="ltr"
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
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
            className="relative mt-20"
          >
            {isLoading &&
              [...Array(6)].map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-center justify-center gap-5 p-5 bg-white border rounded-2xl border-gray-4/40 bg-opacity-90">
                    <Skeleton className="rounded-full w-36 h-36" />
                    <Skeleton className="w-3/4 h-7" />
                  </div>
                </SwiperSlide>
              ))}
            {categories &&
              categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <div className="flex flex-col items-center justify-center gap-5 p-5 bg-white border rounded-2xl border-gray-4/40 bg-opacity-90">
                    <Link
                      to={"/shop?category=" + category.id}
                      className="w-full flex justify-center items-center"
                    >
                      <img
                        src={category.image}
                        alt={category.category_en}
                        width={140}
                        height={140}
                        loading="lazy"
                        className="rounded-full w-36 h-36 object-cover"
                      />
                    </Link>
                    <Link
                      to={"/shop?category=" + category.id}
                      className="text-xl font-bold text-center text-gray-900"
                    >
                      {i18n.language == "en"
                        ? category.category_en
                        : i18n.language == "fr"
                        ? category.category_fr
                        : category.category_ar}
                    </Link>
                  </div>
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
