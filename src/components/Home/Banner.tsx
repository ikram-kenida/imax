import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

export const Banner = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "home.banner",
  });

  return (
    <section className="relative bg-white py-14">
      <div className="container">
        <div className="bg-banner bg-cover bg-center rounded-xl w-full h-[341px] flex items-center justify-end">
          <div className="flex flex-col items-center justify-center md:text-start text-center gap-5 md:pe-12">
            <span className="text-xl font-bold text-white uppercase">
              {t("title")}
            </span>
            <h5 className="md:text-4xl text-3xl font-semibold text-white capitalize">
              {t("description")}
            </h5>
            <Button
              className="bg-blue-600 px-4 h-[39px] p-2 gap-2 rounded"
              to="/shop"
            >
              <span className="text-sm font-semibold text-white uppercase">
                {t("btn")}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
