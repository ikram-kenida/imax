import { PriceRangeInput } from "@/components/PriceRangeInput";
import { ProductCard } from "@/components/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import axiosClient from "@/axios";
import useSWR from "swr";
import { PaginationContainer } from "@/components/ui/PaginationContainer";
import { SkeletonProduct } from "@/components/ui/SkeletonProduct";
import { Category, Product } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { PageTitle } from "@/components/ui/page-title";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";

const Products = () => {
  const [priceGap] = useState<number>(20);
  const [priceMax] = useState<number>(500);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(priceMax);
  const [currentPage, setCurrentPage] = useState(1);
  const linkCategories = "/categories";
  const { t, i18n } = useTranslation("translation", {
    keyPrefix: "shop",
  });
  const [selectedCategories, setSelectedCategories] = useState<
    (number | string)[]
  >([]);
  const [selectedType, setSelectedType] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const [inputSearch, setInputSearch] = useState(searchQuery);
  const [link, setLink] = useState("/products?page=1&search=" + searchQuery);

  useEffect(() => {
    if (category) {
      setSelectedCategories([Number(category)]);
    }
  }, [category]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget?.reset();
    setMaxPrice(priceMax);
    setMinPrice(0);
    setSelectedCategories([]);
    setSelectedType("");
    setSearchParams({});
  };

  const fetcher = async () => {
    const response = await axiosClient.get(link);
    return response.data;
  };

  const { data, isLoading, mutate } = useSWR(link, fetcher);
  const { products }: { products: Product[] } = data ?? {};

  const fetcherCategory = async () => {
    const response = await axiosClient.get(linkCategories);
    return response.data;
  };

  const { data: dataCategories, isLoading: isLoadingCategories } = useSWR(
    linkCategories,
    fetcherCategory
  );
  const { categories }: { categories: Category[] } = dataCategories ?? {};

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (
    categoryId: number | string,
    isChecked: boolean
  ) => {
    setSelectedCategories((prevCategories) =>
      isChecked
        ? [...prevCategories, categoryId]
        : prevCategories.filter((id) => id !== categoryId)
    );
    setCurrentPage(1);
  };

  const handleTypeChange = (type: string, isChecked: boolean) => {
    setSelectedType(isChecked ? type : "");
    setCurrentPage(1);
  };

  const onSearchChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputSearch(value);
      setSearchParams({ search: value });
      setCurrentPage(1);
    },
    500
  );

  useEffect(() => {
    const buildLink = () => {
      let query = "";
      if (searchQuery) {
        query += `&search=${searchQuery}`;
      }
      if (selectedCategories.length > 0) {
        query += `&categories=${selectedCategories.join(",")}`;
      }
      if (selectedType) {
        query += `&types=${selectedType}`;
      }
      if (minPrice !== 0 || maxPrice !== priceMax) {
        query += `&price_min=${minPrice}&price_max=${maxPrice}`;
      }

      return `/products?page=${currentPage}${query}`;
    };

    setLink(buildLink());
    mutate();
  }, [
    selectedCategories,
    selectedType,
    minPrice,
    maxPrice,
    currentPage,
    searchQuery,
  ]);

  return (
    <section className="pt-7 pb-20">
      <PageTitle page={t("All Products")} link={t("Shop")} path="/shop" />
      <div className="container mt-12">
        <div className="flex items-start gap-8 flex-wrap">
          <div className="xl:w-[295px] w-full rounded bg-white border border-stone-300">
            <form action="#" method="post" onSubmit={onSubmit}>
              <div className="py-5 px-7 flex justify-between items-center border-b border-stone-300">
                <h4 className="text-zinc-500 text-xl font-semibold tracking-wide">
                  {t("Filter")}
                </h4>
                <img
                  src="/icons/filter.svg"
                  alt="filter"
                  width={16}
                  height={14}
                />
              </div>
              <div className="py-5 px-7 flex justify-between items-center border-b border-stone-300">
                <div className="relative w-full">
                  <span className="absolute top-1/2 -translate-y-1/2 start-2">
                    <img
                      src="/icons/search-2.svg"
                      alt="search"
                      width={16}
                      height={16}
                    />
                  </span>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="w-full h-10 p-4 ps-8 border rounded-xl text-xs text-gray-400 font-normal placeholder:text-xs placeholder:text-gray-400 placeholder:font-normal"
                    placeholder="Type Keyword..."
                    defaultValue={inputSearch}
                    onChange={onSearchChange}
                  />
                </div>
              </div>
              <Accordion
                type="multiple"
                defaultValue={["item-1", "item-2", "item-3"]}
                className="w-full"
              >
                <AccordionItem value="item-1" className="px-7">
                  <AccordionTrigger>{t("Product Type")}</AccordionTrigger>
                  <AccordionContent className="pb-4 flex flex-col gap-5">
                    <div className="flex gap-2 items-center">
                      <Checkbox
                        onCheckedChange={(e: boolean) =>
                          handleTypeChange("manual", e)
                        }
                        id="type_manual"
                        name="type"
                        checked={selectedType == "manual"}
                      />
                      <label
                        htmlFor="type_manual"
                        className="text-zinc-500 text-base font-normal"
                      >
                        {t("Manual")}
                      </label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Checkbox
                        id="type_automatic"
                        name="type"
                        onCheckedChange={(e: boolean) =>
                          handleTypeChange("automatic", e)
                        }
                        checked={selectedType == "automatic"}
                      />
                      <label
                        htmlFor="type_automatic"
                        className="text-zinc-500 text-base font-normal"
                      >
                        {t("Automatic")}
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="px-7">
                  <AccordionTrigger>{t("Categories")}</AccordionTrigger>
                  <AccordionContent className="pb-4 flex flex-col gap-5">
                    {isLoadingCategories &&
                      [...Array(5)].map((_, index) => (
                        <div className="flex gap-2 items-center" key={index}>
                          <Skeleton className="h-6 w-6" />
                          <Skeleton className="w-3/4 h-6" />
                        </div>
                      ))}
                    {!isLoadingCategories &&
                      categories &&
                      categories.map((category) => (
                        <div
                          className="flex gap-2 items-center"
                          key={category.id}
                        >
                          <Checkbox
                            name={"category_" + category.id}
                            id={"category_" + category.id}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={(e: boolean) =>
                              handleCategoryChange(category.id, e)
                            }
                          />
                          <label
                            className="text-zinc-500 text-base font-normal capitalize cursor-pointer"
                            htmlFor={"category_" + category.id}
                          >
                            {i18n.language == "en"
                              ? category.category_en
                              : i18n.language == "fr"
                              ? category.category_fr
                              : category.category_ar}
                          </label>
                        </div>
                      ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="px-7">
                  <AccordionTrigger>{t("Price")}</AccordionTrigger>
                  <AccordionContent className="pb-4 ">
                    <PriceRangeInput
                      minPrice={minPrice}
                      maxPrice={maxPrice}
                      setMaxPrice={setMaxPrice}
                      setMinPrice={setMinPrice}
                      priceGap={priceGap}
                      priceMax={priceMax}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="py-5 px-7 flex justify-center items-center">
                <Button
                  className="w-[104px] h-9 py-2.5 bg-blue-600 rounded-md"
                  type="submit"
                >
                  <span className="text-white text-base font-medium">
                    {t("Clear")}
                  </span>
                </Button>
              </div>
            </form>
          </div>
          <div className="flex-1">
            {products && products.length <= 0 ? (
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
                  {t("Products Not Found")}
                </h4>
                <p className="text-zinc-500 text-base font-normal leading-tight tracking-tight text-center mt-2">
                  {t(
                    "We apologize, but there are currently no products available."
                  )}
                </p>
              </div>
            ) : (
              <>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                  {isLoading &&
                    [...Array(6)].map((_, index) => (
                      <div className="col-span-1" key={index}>
                        <SkeletonProduct key={index} />
                      </div>
                    ))}
                  {!isLoading &&
                    products &&
                    products.map((product) => (
                      <div className="col-span-1" key={product.id}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                </div>
                <div className="mt-14 flex justify-center">
                  {products && (
                    <PaginationContainer
                      totalPages={data.last_page}
                      currentPage={data.current_page}
                      onPageChange={onPageChange}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
