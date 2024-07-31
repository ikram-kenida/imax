import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Description } from "./Description";
import { Reviews } from "./Reviews";
import { ProductDetails } from "@/types";
import { KeyedMutator } from "swr";
import { useTranslation } from "react-i18next";

export const ProductDescription = ({
  product,
  mutate,
}: {
  product: ProductDetails;
  mutate: KeyedMutator<any>;
}) => {
  const { i18n, t } = useTranslation("translation", {
    keyPrefix: "productDetails",
  });

  return (
    <section className="py-14">
      <div className="container">
        <h2 className="text-neutral-700 text-3xl font-semibold ps-5 relative before:absolute before:h-full before:w-1 before:rounded-xl before:bg-blue-600 before:top-0 before:start-0">
          {t("productDescription")}
        </h2>
        <Tabs
          defaultValue="description"
          className="mt-7"
          dir={i18n.language == "ar" ? "rtl" : "ltr"}
        >
          <TabsList className="rounded-none flex w-auto justify-start">
            <TabsTrigger
              value="description"
              className="text-zinc-400 text-sm font-medium data-[state=active]:text-blue-600 border-b border-stone-300 data-[state=active]:border-blue-600 ps-2 pe-5 rounded-none w-auto"
            >
              {t("description")}
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="text-zinc-400 text-sm font-medium data-[state=active]:text-blue-600 border-b border-stone-300 data-[state=active]:border-blue-600 ps-2 pe-5 rounded-none w-auto"
            >
              {t("reviews")}
            </TabsTrigger>
            <div className="border-b border-stone-300" />
          </TabsList>
          <TabsContent value="description" className="flex flex-col gap-8 mt-8">
            <Description product={product} />
          </TabsContent>
          <TabsContent value="reviews">
            <Reviews product={product} mutate={mutate} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
