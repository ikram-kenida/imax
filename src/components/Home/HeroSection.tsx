import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "home.heroSection",
  });

  return (
    <section className="w-full pt-20 pb-16 bg-home">
      <div className="container h-full">
        <div className="flex items-center justify-between w-full h-full flex-wrap">
          <div className="flex flex-col items-start justify-end xl:text-start text-center gap-10 text-white xl:w-[623px] w-full">
            <div className="block">
              <h1 className="text-white xl:text-6xl md:text-5xl text-4xl font-semibold md:tracking-[1.2px] tracking-[0.72px] uppercase">
                {t("title")}
              </h1>
              <p className="text-white text-opacity-90 font-normal md:text-xl text-base mt-3">
                {t("description")}
              </p>
            </div>
            <div className="flex gap-6 xl:justify-start justify-center w-full">
              <Link
                to="/auth/signup"
                className="bg-white rounded-md px-4 h-[49px] flex justify-center items-center"
              >
                <span className="text-blue-600 lg:text-xl text-base font-medium">
                  {t("btn-1")}
                </span>
              </Link>
              <Button className="bg-transparent rounded-md px-4 h-[49px] border-2 border-white">
                <span className="text-white lg:text-xl text-base font-medium">
                  {t("btn-2")}
                </span>
              </Button>
            </div>
          </div>
          <div className="xl:block hidden relative">
            <img
              src="/images/home.png"
              alt="home"
              width={322}
              height={393}
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          <span className="text-white text-lg font-normal mt-1">
            {t("scroll-down")}
          </span>
          <img
            src="/icons/arrow-down-2.svg"
            alt="arrow down"
            width={16}
            height={24}
          />
        </div>
      </div>
    </section>
  );
};
