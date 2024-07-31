import { Order } from "@/types";
import { useTranslation } from "react-i18next";

export const OrderCard = ({ order }: { order: Order }) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "profile",
  });

  return (
    <div className="py-7 px-12 bg-neutral-100 rounded-lg grid md:grid-cols-2 grid-cols-1 items-end">
      <div className="col-span-1">
        <h5 className="text-neutral-700 text-xl font-normal">
          {t("Order on")}: #{order.order_id}
        </h5>
        <p className="mt-3.5 text-zinc-500 text-sm font-normal">
          {t("Order Date")} :{" "}
          <span className="text-stone-300">{order.date}</span>
        </p>
        <p className="mt-2 text-zinc-500 text-sm font-normal">
          {t("Payment Method")} :{" "}
          <span className="text-stone-300 capitalize">
            {order.payment_method}
          </span>
        </p>
      </div>
      <div className="col-span-1 md:text-end">
        <p className="mt-3.5 text-zinc-500 text-sm font-normal">
          {t("Total Amount")} :{" "}
          <span className="text-stone-300 capitalize">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: order.currency,
            }).format(Number(order.total_amount))}
          </span>
        </p>
        <p className="mt-3.5 text-zinc-500 text-sm font-normal">
          {t("Order Status")} :{" "}
          <span className="text-stone-300 capitalize">
            {order.payment_status}
          </span>
        </p>
      </div>
    </div>
  );
};
