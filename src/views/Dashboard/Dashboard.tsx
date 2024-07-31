import axiosClient from "@/axios";
import { LineGraph } from "@/components/Dashboard/LineGraph";
import { PageTitle } from "@/components/Dashboard/ui/PageTitle";
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
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        className="px-2 py-4"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
          category
          <ArrowUpDown className="h-4 w-4" />
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
        {row.getValue("category")}
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

const Dashboard = () => {
  const fetcher = async () => {
    const response = await axiosClient.get("/dashboard");
    return response.data;
  };

  const { data } = useSWR("/dashboard", fetcher);
  const { products, orders } = data?.dashboard ?? [];
  const { users, codes, users_ban, categories, admins, code_expired, coupons } =
    data ?? 0;
  const { topProducts } = data ?? [];

  const table = useReactTable({
    data: topProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="w-full">
      <PageTitle title="Dahsboard" />
      <div className="grid grid-cols-3 mt-6 gap-4">
        <div className="col-span-1">
          <div className="px-3 py-8 bg-white rounded-xl shadow flex-col justify-start items-center gap-4 flex">
            <h4 className="text-center text-stone-800 text-xl font-semibold font-['Lato']">
              Total Categories
            </h4>
            <div className="justify-center items-center flex">
              <span className="text-blue-600 text-4xl font-semibold font-['Lato']">
                {categories}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="px-3 py-8 bg-white rounded-xl shadow flex-col justify-start items-center gap-4 flex">
            <h4 className="text-center text-stone-800 text-xl font-semibold font-['Lato']">
              Total Products
            </h4>
            <div className="justify-center items-center flex">
              <span className="text-blue-600 text-4xl font-semibold font-['Lato']">
                {products?.length}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="px-3 py-8 bg-white rounded-xl shadow flex-col justify-start items-center gap-4 flex">
            <h4 className="text-center text-stone-800 text-xl font-semibold font-['Lato']">
              Total Orders
            </h4>
            <div className="justify-center items-center flex">
              <span className="text-blue-600 text-4xl font-semibold font-['Lato']">
                {orders?.length}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="px-3 py-8 bg-white rounded-xl shadow flex-col justify-start items-center gap-4 flex">
            <h4 className="text-center text-stone-800 text-xl font-semibold font-['Lato']">
              Total Users
            </h4>
            <div className="justify-center items-center flex">
              <span className="text-blue-600 text-4xl font-semibold font-['Lato']">
                {users}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="px-3 py-8 bg-white rounded-xl shadow flex-col justify-start items-center gap-4 flex">
            <h4 className="text-center text-stone-800 text-xl font-semibold font-['Lato']">
              Ban Users
            </h4>
            <div className="justify-center items-center flex">
              <span className="text-blue-600 text-4xl font-semibold font-['Lato']">
                {users_ban}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="px-3 py-8 bg-white rounded-xl shadow flex-col justify-start items-center gap-4 flex">
            <h4 className="text-center text-stone-800 text-xl font-semibold font-['Lato']">
              Admin
            </h4>
            <div className="justify-center items-center flex">
              <span className="text-blue-600 text-4xl font-semibold font-['Lato']">
                {admins}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="px-3 py-8 bg-white rounded-xl shadow flex-col justify-start items-center gap-4 flex">
            <h4 className="text-center text-stone-800 text-xl font-semibold font-['Lato']">
              Total Code
            </h4>
            <div className="justify-center items-center flex">
              <span className="text-blue-600 text-4xl font-semibold font-['Lato']">
                {codes}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="px-3 py-8 bg-white rounded-xl shadow flex-col justify-start items-center gap-4 flex">
            <h4 className="text-center text-stone-800 text-xl font-semibold font-['Lato']">
              Total Code Expired
            </h4>
            <div className="justify-center items-center flex">
              <span className="text-blue-600 text-4xl font-semibold font-['Lato']">
                {code_expired}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="px-3 py-8 bg-white rounded-xl shadow flex-col justify-start items-center gap-4 flex">
            <h4 className="text-center text-stone-800 text-xl font-semibold font-['Lato']">
              Total Coupons
            </h4>
            <div className="justify-center items-center flex">
              <span className="text-blue-600 text-4xl font-semibold font-['Lato']">
                {coupons}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        {data && <LineGraph dataResponse={data.dashboard} />}
      </div>
      <div className="mt-6">
        {topProducts && (
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

export default Dashboard;
