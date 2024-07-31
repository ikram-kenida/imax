import axiosClient from "@/axios";
import { CategoryCard } from "@/components/Dashboard/Categories/CategoryCard";
import { PageTitle } from "@/components/Dashboard/ui/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { ProductCategory } from "@/types/Dashboard";
import useSWR from "swr";
import { CreateCategory } from "@/components/Dashboard/Categories/CreateCategory";

const Categories = () => {
  const link = "/dashboard/categories";

  const fatcher = async () => {
    const response = await axiosClient.get(link);

    return response.data;
  };

  const { data, isLoading, mutate } = useSWR(link, fatcher);
  const { categories }: { categories: ProductCategory[] } = data ?? [];

  return (
    <section className="w-full">
      <Toaster />
      <div className="flex justify-between items-end">
        <PageTitle
          title="All Categories"
          array={[
            {
              name: "Categories",
            },
          ]}
        />
        <CreateCategory mutate={mutate} />
      </div>
      <div className="grid grid-cols-4 mt-6 gap-5">
        {isLoading
          ? [...Array(4)].map((_, index) => (
              <div className="col-span-1" key={index}>
                <div className="w-full h-44 bg-white shadow rounded-xl flex flex-col items-center justify-center gap-6">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="text-center w-full">
                    <Skeleton className="w-1/2 h-6 mx-auto" />
                    <Skeleton className="w-3/4 h-5 mt-2 mx-auto" />
                  </div>
                </div>
              </div>
            ))
          : categories &&
            categories.map((category) => (
              <div className="col-span-1" key={category.id}>
                <CategoryCard
                  category={category}
                />
              </div>
            ))}
      </div>
    </section>
  );
};

export default Categories;
