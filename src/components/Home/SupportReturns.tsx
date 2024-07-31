import { useTranslation } from "react-i18next";

export const SupportReturns = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "home.section-7",
  });

  return (
    <section className="relative py-14 bg-zinc-100">
      <div className="container">
        <div className="text-start">
          <h2 className="lg:text-5xl md:text-4xl text-3xl text-neutral-900 font-semibold ps-5 relative before:absolute before:h-full before:w-2 before:rounded-xl before:bg-blue-600 before:top-0 before:start-0">
            {t("title")}
          </h2>
        </div>
        <div className="relative mt-20">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            <div className="col-span-1">
              <div className="flex items-center justify-center w-full h-[250px] gap-4 flex-col bg-white rounded-lg px-3">
                <img
                  src="/icons/support.svg"
                  alt="support"
                  width={80}
                  height={80}
                />
                <h6 className="text-xl font-bold uppercase text-black/85">
                  {t("card-1.title")}
                </h6>
                <p className="text-base font-medium text-black/60 text-center">
                  {t("card-1.description")}
                  <br />
                  <span className="underline text-zinc-800">+971551221684</span>
                </p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex items-center justify-center w-full h-[250px] gap-4 flex-col bg-white rounded-lg px-3">
                <img
                  src="/icons/returns.svg"
                  alt="returns"
                  width={80}
                  height={80}
                />
                <h6 className="text-xl font-bold uppercase text-black/85">
                  {t("card-2.title")}
                </h6>
                <p className="text-base font-medium text-black/60 text-center">
                  {t("card-2.description")}
                </p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex items-center justify-center w-full h-[250px] gap-4 flex-col bg-white rounded-lg px-3">
                <img
                  src="/icons/refund.svg"
                  alt="refund"
                  width={80}
                  height={80}
                />
                <h6 className="text-xl font-bold uppercase text-black/85">
                  {t("card-3.title")}
                </h6>
                <p className="text-base font-medium text-black/60 text-center">
                  {t("card-3.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
