import axiosClient from "@/axios";
import { UpdateCategory } from "@/components/Dashboard/Categories/UpdateCategory";
import { PageTitle } from "@/components/Dashboard/ui/PageTitle";
import { Loading } from "@/components/ui/loading";
import { ProductCategory } from "@/types/Dashboard";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { AllProduct } from "@/types/Dashboard";
import { ArrowUpDown } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

const columns: ColumnDef<AllProduct>[] = [
  {
    accessorKey: "image",
    header: () => (
      <Button className="px-2 py-4">
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize">
          Image
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <img
        src={row.getValue("image")}
        alt="image"
        className="w-14 h-14 rounded-2xl"
      />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        className="px-2 py-4"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
          Title
          <ArrowUpDown className="h-4 w-4" />
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
        {row.getValue("title")}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        className="px-2 py-4"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
          price
          <ArrowUpDown className="h-4 w-4" />
        </span>
      </Button>
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return (
        <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
          {formatted}
        </span>
      );
    },
  },
  {
    accessorKey: "rate",
    header: ({ column }) => (
      <Button
        className="px-2 py-4"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
          rate
          <ArrowUpDown className="h-4 w-4" />
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato'] flex gap-2">
        {row.getValue("rate")}{" "}
        <img
          src="/icons/star.svg"
          alt="star"
          width={12}
          height={12}
          className="w-3 h-3"
        />
      </span>
    ),
  },
  {
    id: "actions",
    header: () => (
      <Button className="px-2 py-4">
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize">
          Actions
        </span>
      </Button>
    ),
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center">
          <Button
            className="w-6 h-6"
            to={"/dashboard/products/update/" + product.id}
          >
            <img src="/icons/update.svg" alt="update" width={14} height={14} />
          </Button>
          <Button
            className="w-6 h-6"
            to={"/dashboard/products/" + product.slug}
          >
            <img
              src="/icons/eye-view.svg"
              alt="eye-view"
              width={16}
              height={12}
            />
          </Button>
        </div>
      );
    },
  },
];

const CategoryView = () => {
  const { id } = useParams();

  const fetcher = async () => {
    const response = await axiosClient.get("/dashboard/categories/" + id);
    return response.data;
  };

  const { data, isLoading, mutate } = useSWR(
    "/dashboard/categories/" + id,
    fetcher
  );
  const { category }: { category: ProductCategory } = data ?? {};
  const { products }: { products: AllProduct[] } = data ?? [];

  const table = useReactTable({
    data: products ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="w-full">
      <Toaster />
      <div className="flex justify-between items-end">
        <PageTitle
          title="Category Details"
          array={[
            {
              name: "Categories",
              path: "/dashboard/categories",
            },
            {
              name: "Category Details",
            },
          ]}
        />
        <UpdateCategory mutate={mutate} category={category} />
      </div>
      <div className="p-8 bg-white rounded-3xl mt-6">
        <div className="flex justify-start gap-3 items-center">
          <img
            src={category.image}
            alt={category.category_en}
            className="w-24 h-24"
          />
          <h4 className="text-blue-600 text-3xl font-bold font-['Lato']">
            {category.category_en}
          </h4>
        </div>
        <div className="mt-7">
          <div className="p-6 bg-yellow-50 rounded-xl flex-col justify-center items-center gap-2 flex">
            <h5 className="text-stone-950 text-3xl font-bold font-['Lato']">
              {category.product_length}
            </h5>
            <h6 className="text-center text-neutral-500 text-sm font-medium font-['Lato'] capitalize">
              Products
            </h6>
          </div>
        </div>
      </div>
      <div className="mt-6">
        {products && (
          <div className="w-full py-4 px-6 bg-white rounded-xl">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryView;
