import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

export const OrderEmpty = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "profile.order-empty",
  });

  return (
    <div className="w-full py-20 flex justify-center items-center flex-col">
      <div className="flex items-center justify-center size-36 bg-blue-600/5 rounded-full">
        <img
          src="/icons/order-empty.svg"
          alt="Order Empty"
          width={61}
          height={61}
        />
      </div>
      <h4 className="text-neutral-700 text-3xl font-normal mt-9">
        {t("title")}
      </h4>
      <p
        className="text-zinc-500 text-base font-normal leading-tight tracking-tight text-center mt-2"
        dangerouslySetInnerHTML={{ __html: t("description") }}
      />
      <Button
        to="/shop"
        className="w-[275px] h-[54px] bg-blue-600 rounded-lg mt-7 disabled:opacity-70"
      >
        <span className="text-white text-lg font-medium">
          {t("Continue Shopping")}
        </span>
      </Button>
    </div>
  );
};
