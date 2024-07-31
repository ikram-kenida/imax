import { Order } from "@/types";
import { TabsContent } from "../ui/tabs";
import { OrderCard } from "./OrderCard";
import { OrderEmpty } from "./OrderEmpty";
import axiosClient from "@/axios";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";

export const Orders = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "profile",
  });
  const link = "/orders";
  const fetcher = async () => {
    const response = await axiosClient.get(link);

    return response.data;
  };

  const { data, isLoading } = useSWR(link, fetcher);
  const { orders }: { orders: Order[] } = data ?? [];

  return (
    <TabsContent value="orders">
      <ScrollArea className="h-[calc(100vh-10rem)]">
        {isLoading && (
          <div className="flex flex-col gap-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-32" />
            ))}
          </div>
        )}
        {!isLoading &&
          (orders?.length > 0 ? (
            <>
              <h3 className="text-neutral-700 text-[28px] font-normal leading-[33.50px] tracking-wide">
                {t("orders")}
              </h3>
              <div className="flex flex-col mt-10 gap-5">
                {orders.map((order) => (
                  <OrderCard order={order} key={order.id} />
                ))}
              </div>
            </>
          ) : (
            <OrderEmpty />
          ))}
      </ScrollArea>
    </TabsContent>
  );
};
