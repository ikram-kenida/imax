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
import { Coupon } from "@/types/Dashboard";
import axiosClient from "@/axios";
import useSWR from "swr";
import { HashLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { PaginationContainer } from "@/components/ui/PaginationContainer";
import { debounce } from "lodash";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormGroup } from "@/components/Dashboard/ui/FormGroup";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const Coupons = () => {
  const [link, setLink] = useState("/dashboard/coupons?page=1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState<string>();
  const [discount, setDiscount] = useState<string>();
  const [expire, setExpire] = useState<Date>();

  const fatcher = async () => {
    const response = await axiosClient.get(link);

    return response.data;
  };

  const { data, isLoading, mutate } = useSWR(link, fatcher);
  const { coupons }: { coupons: Coupon[] } = data ?? [];

  const onSearchChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchQuery(value);
    },
    500
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const buildLink = () => {
      let query = "";
      if (searchQuery) {
        query += `&search=${searchQuery}`;
      }

      return `/dashboard/coupons?page=${currentPage}${query}`;
    };

    setLink(buildLink());
    mutate();
  }, [currentPage, searchQuery]);

  const onSubmit = () => {
    setLoading(true);
    const data = {
      coupon,
      discount_percent: discount,
      expire_at: expire,
    };

    axiosClient
      .post("/dashboard/coupons", data)
      .then((response) => {
        toast("Success!", {
          description: response.data.message || "Coupon created successfully",
          className: "bg-green-600 border-0",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        mutate();
        setOpen(false);
        setCoupon(undefined);
        setExpire(undefined);
        setDiscount(undefined);
      })
      .catch((error) => {
        toast("Error!", {
          description: error.response?.data?.message || "An error occurred",
          className: "bg-red-600 border-0",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteCoupon = (id: number | string) => {
    axiosClient
      .delete("/dashboard/coupons/" + id)
      .then((response) => {
        toast("Success!", {
          description: response.data.message || "Coupon deleted successfully",
          className: "bg-green-600 border-0",
        });
        mutate();
      })
      .catch((error) => {
        toast("Error!", {
          description: error.response?.data?.message || "An error occurred",
          className: "bg-red-600 border-0",
        });
      });
  };

  const columns: ColumnDef<Coupon>[] = [
    {
      accessorKey: "coupon",
      header: () => (
        <Button className="px-2 py-4">
          <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
            Coupon
          </span>
        </Button>
      ),
      cell: ({ row }) => (
        <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
          {row.getValue("coupon")}
        </span>
      ),
    },
    {
      accessorKey: "discount_percent",
      header: () => (
        <Button className="px-2 py-4">
          <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
            Discount Percent
          </span>
        </Button>
      ),
      cell: ({ row }) => (
        <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
          {"%" + row.getValue("discount_percent")}
        </span>
      ),
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          className="px-2 py-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
            Created At
          </span>
        </Button>
      ),
      cell: ({ row }) => (
        <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
          {row.getValue("created_at")}
        </span>
      ),
    },
    {
      accessorKey: "expire_at",
      header: ({ column }) => (
        <Button
          className="px-2 py-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
            Expire At
          </span>
        </Button>
      ),
      cell: ({ row }) => (
        <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
          {row.getValue("expire_at")}
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
        const coupon = row.original;

        return (
          <div className="flex items-center justify-center">
            <Button
              className="w-6 h-6"
              onClick={() => handleDeleteCoupon(coupon.id)}
            >
              <img
                src="/icons/delete.svg"
                alt="delete"
                width={16}
                height={12}
              />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: coupons,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="w-full">
      <Toaster />
      <div className="flex justify-between items-end">
        <PageTitle
          title="All Coupons"
          array={[
            {
              name: "Coupons",
            },
          ]}
        />
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
          <DialogTrigger asChild>
            <Button className="text-white bg-green-600 px-5 py-3 rounded-xl font-['Lato'] font-semibold">
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:max-w-[636px] bg-white">
            <DialogHeader>
              <DialogTitle>Create Coupon</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 grid-cols-2 py-4">
              <div className="col-span-1">
                <FormGroup
                  title="Coupon"
                  placeholder="Coupon"
                  name="Coupon"
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <FormGroup
                  title="Discount Percent"
                  placeholder="Discount Percent"
                  name="discount_percent"
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <FormGroup
                  title="Expire At"
                  placeholder="Enter expire at"
                  name="expire_at"
                  type="date"
                  date={expire}
                  setDate={(date) => setExpire(date)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={onSubmit}
                className="px-5 py-3 bg-blue-600 rounded-xl disabled:opacity-60"
                disabled={loading}
              >
                <span className="text-white text-base font-normal">
                  {loading ? "Loading..." : "Create"}
                </span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6">
        <div className="w-full py-4 px-6 bg-white rounded-xl">
          <div className="flex">
            <Input
              placeholder="Filter coupons..."
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
              {coupons.length >= 10 && (
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

export default Coupons;
