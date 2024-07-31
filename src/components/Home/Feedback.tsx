import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as typeSwiper } from "swiper/types";
import { Button } from "../ui/button";
import { useState } from "react";
import { Pagination } from "swiper/modules";
import { FeedbackCard } from "@/components/FeedbackCard";
import { useTranslation } from "react-i18next";
import { ProductReviews } from "@/types";
import axiosClient from "@/axios";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";

export const Feedback = () => {
  const [swiper, setSwiper] = useState<typeSwiper>();
  const { t } = useTranslation("translation", {
    keyPrefix: "home.section-6",
  });

  const link = "/feedback";

  const fetcher = async () => {
    const response = await axiosClient.get(link);

    return response.data;
  };

  const { data, isLoading } = useSWR(link, fetcher);
  const { feedback }: { feedback: ProductReviews[] } = data ?? [];

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
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1025: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="relative mt-20"
          >
            {isLoading &&
              [...Array(5)].map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col gap-5 bg-white rounded-xl p-6">
                    <Skeleton className="w-full h-32" />
                    <div className="block">
                      <div className="flex justify-between items-center">
                        <Skeleton className="w-20 h-6" />
                        <div className="flex items-center gap-1">
                          <Skeleton className="w-4 h-4" />
                          <Skeleton className="w-4 h-4 rounded-full" />
                        </div>
                      </div>
                      <Skeleton className="w-20 h-4 mt-2" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            {feedback &&
              feedback.map((review) => (
                <SwiperSlide key={review.id}>
                  <FeedbackCard review={review} />
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
