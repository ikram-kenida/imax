import { PageTitle } from "@/components/Dashboard/ui/PageTitle";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Customer } from "@/types/Dashboard";
import axiosClient from "@/axios";
import useSWR from "swr";
import { HashLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { PaginationContainer } from "@/components/ui/PaginationContainer";
import { cn } from "@/lib/utils";
import { debounce } from "lodash";

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: () => (
      <Button className="px-2 py-4">
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
          Customer Name
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <Button className="px-2 py-4">
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
          Email Address
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
        {row.getValue("email")}
      </span>
    ),
  },
  {
    accessorKey: "role",
    header: () => (
      <Button className="px-2 py-4">
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
          Role
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
        {row.getValue("role")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <Button className="px-2 py-4">
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
          Status
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span
        className={cn(
          "py-4 px-2 text-xs font-normal font-['Lato']",
          row.getValue("status") ? "text-green-600" : "text-red-600"
        )}
      >
        {row.getValue("status") ? "Active" : "DeActive"}
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        className="px-2 py-4"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
          Date
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
        {row.getValue("date")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => (
      <Button className="px-2 py-4 w-full">
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize">
          Actions
        </span>
      </Button>
    ),
    cell: ({ row }) => {
      const users = row.original;

      return (
        <div className="flex items-center justify-center">
          <Button className="w-6 h-6" to={"/dashboard/customers/" + users.id}>
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

const Customers = () => {
  const [link, setLink] = useState("/dashboard/users?page=1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const fatcher = async () => {
    const response = await axiosClient.get(link);

    return response.data;
  };

  const { data, isLoading, mutate } = useSWR(link, fatcher);
  const { users }: { users: Customer[] } = data ?? [];

  const onSearchChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchQuery(value);
    },
    500
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const buildLink = () => {
      let query = "";
      if (searchQuery) {
        query += `&search=${searchQuery}`;
      }

      return `/dashboard/users?page=${currentPage}${query}`;
    };

    setLink(buildLink());
    mutate();
  }, [currentPage, searchQuery]);

  return (
    <section className="w-full">
      <div className="flex justify-between items-end">
        <PageTitle
          title="All Customers"
          array={[
            {
              name: "Customers",
            },
          ]}
        />
      </div>
      <div className="mt-6">
        <div className="w-full py-4 px-6 bg-white rounded-xl">
          <div className="flex">
            <Input
              placeholder="Filter titles..."
              onChange={onSearchChange}
              className="max-w-sm"
            />
          </div>
          {isLoading ? (
            <div className="w-full h-80 flex justify-center items-center bg-white">
              <HashLoader color="#1577EB" />
            </div>
          ) : (
            <>
              <div className="mt-6">
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
              {users.length >= 10 && (
                <PaginationContainer
                  totalPages={data.last_page}
                  currentPage={data.current_page}
                  onPageChange={onPageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Customers;
