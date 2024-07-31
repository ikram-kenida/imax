import axiosClient from "@/axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";

interface Category {
  id: number;
  category_en: string;
  category_ar: string;
  image: string;
}

export const SelectCategory = ({
  setCategoryId,
  categoryId,
}: {
  setCategoryId: Dispatch<SetStateAction<string>>;
  categoryId: string;
}) => {
  const link = "/dashboard/categories";
  const fetcher = async () => {
    const response = await axiosClient.get(link);

    return response.data;
  };

  const { data } = useSWR(link, fetcher);

  return (
    <Select
      onValueChange={(value) => setCategoryId(value)}
      defaultValue={categoryId}
    >
      <span className="text-stone-950 text-base font-semibold font-['Lato']">
        Category
      </span>
      <SelectTrigger className="w-full h-auto px-4 py-3 mt-2 bg-stone-50 rounded-xl border border-zinc-100 text-neutral-400 text-sm font-medium font-['Lato']">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent className="bg-stone-50 rounded-xl border border-zinc-100 text-stone-950">
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {data?.categories &&
            data.categories.map((category: Category) => (
              <SelectItem
                value={category.id.toString()}
                key={category.id}
                className="cursor-pointer capitalize"
              >
                {category.category_en}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
