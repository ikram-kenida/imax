import { PageTitle } from "@/components/Dashboard/ui/PageTitle";
import { Loading } from "@/components/ui/loading";
import { Customer, ProductOrder } from "@/types/Dashboard";
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
import { AllProduct } from "@/types/Dashboard";
import axiosClient from "@/axios";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useStateContext } from "@/contexts/ContextProvider";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormGroup } from "@/components/Dashboard/ui/FormGroup";

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
    header: () => (
      <Button className="px-2 py-4">
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
          Title
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
    accessorKey: "currency",
    header: () => (
      <Button className="px-2 py-4">
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
          Currency
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
        {row.getValue("currency")}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <Button className="px-2 py-4">
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
          Amount
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
        {row.getValue("amount")}
      </span>
    ),
  },
  {
    accessorKey: "payment_method",
    header: () => (
      <Button className="px-2 py-4">
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
          Payment Method
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
        {row.getValue("payment_method")}
      </span>
    ),
  },
  {
    accessorKey: "payment_status",
    header: () => (
      <Button className="px-2 py-4">
        <span className="text-slate-500 text-xs font-normal font-['Lato'] capitalize flex gap-2">
          Payment Status
        </span>
      </Button>
    ),
    cell: ({ row }) => (
      <span className="py-4 px-2 text-stone-950 text-xs font-normal font-['Lato']">
        {row.getValue("payment_status")}
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
      const product = row.original;

      return (
        <div className="flex items-center justify-center">
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

const CustomerView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useStateContext();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const fetcher = async () => {
    const response = await axiosClient.get("/dashboard/users/" + id);
    return response.data;
  };

  const { data, isLoading, mutate } = useSWR("/dashboard/users/" + id, fetcher);
  const { user }: { user: Customer } = data ?? {};
  const { orders }: { orders: ProductOrder[] } = data ?? [];
  const { role } = user ?? "";
  const { status } = user ?? "";

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleUpdateUser = (
    role?: string,
    status?: boolean,
    amount?: string
  ) => {
    const data = {
      role,
      status,
      amount,
    };
    setLoading(true);

    axiosClient
      .put("/dashboard/users/" + user.id, data)
      .then((response) => {
        toast("Success!", {
          description: response.data.message || "Update User Successfully",
          className: "bg-green-600 border-0",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        mutate();
        setOpen(false);
        setAmount("");
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="w-full">
      <Toaster />
      <div className="flex justify-between items-end">
        <PageTitle
          title="Customer"
          array={[
            {
              name: "Customers",
              path: "/dashboard/customers",
            },
            {
              name: "Customer details",
            },
          ]}
        />
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
          <DialogTrigger asChild>
            <Button className="text-white bg-green-600 px-5 py-3 rounded-xl font-['Lato'] font-semibold">
              Add Balance
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:max-w-[636px] bg-white">
            <DialogHeader>
              <DialogTitle>Add Balance</DialogTitle>
            </DialogHeader>
            <div className="w-full">
              <FormGroup
                title="Amount"
                placeholder="Amount"
                name="amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                className="px-5 py-3 bg-blue-600 rounded-xl disabled:opacity-60"
                disabled={loading}
                onClick={() => handleUpdateUser(undefined, undefined, amount)}
              >
                <span className="text-white text-base font-normal">
                  {loading ? "Loading..." : "Add"}
                </span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-8 bg-white rounded-3xl mt-6">
        <div className="flex justify-between gap-3 items-end">
          <div className="space-y-2">
            <h3 className="text-stone-950 text-2xl font-bold font-['Lato']">
              {user.name}
            </h3>
            <h5 className="text-stone-950 text-base font-medium font-['Lato']">
              {user.email}
            </h5>
          </div>
          <h5 className="text-stone-950 text-base font-medium font-['Lato']">
            {user.balance} imx
          </h5>
        </div>
        {currentUser?.role == "super_admin" &&
          currentUser?.email != user.email && (
            <>
              <div className="mt-7">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="super_admin"
                        name="role"
                        className="bg-neutral-400"
                        checked={role == "super_admin"}
                        disabled={loading || isLoading}
                        onCheckedChange={() =>
                          role != "super_admin" &&
                          handleUpdateUser("super_admin")
                        }
                      />
                      <Label
                        htmlFor="super_admin"
                        className="text-stone-950 text-sm font-medium font-['Lato']"
                      >
                        Super Admin
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="admin"
                        className="bg-neutral-400"
                        checked={role == "admin"}
                        disabled={loading || isLoading}
                        onCheckedChange={() =>
                          role != "admin" && handleUpdateUser("admin")
                        }
                      />
                      <Label
                        htmlFor="admin"
                        className="text-stone-950 text-sm font-medium font-['Lato']"
                      >
                        Admin
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="member"
                        className="bg-neutral-400"
                        checked={role == "member"}
                        disabled={loading || isLoading}
                        onCheckedChange={() =>
                          role != "member" && handleUpdateUser("member")
                        }
                      />
                      <Label
                        htmlFor="member"
                        className="text-stone-950 text-sm font-medium font-['Lato']"
                      >
                        Member
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="status"
                        className="bg-neutral-400"
                        checked={status}
                        disabled={loading || isLoading}
                        onCheckedChange={(checked) =>
                          handleUpdateUser(undefined, checked)
                        }
                      />
                      <Label
                        htmlFor="status"
                        className="text-stone-950 text-sm font-medium font-['Lato']"
                      >
                        Status
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        <div className="mt-7">
          <div className="p-6 bg-yellow-50 rounded-xl flex-col justify-center items-center gap-2 flex">
            <h5 className="text-stone-950 text-3xl font-bold font-['Lato']">
              {orders.length}
            </h5>
            <h6 className="text-center text-neutral-500 text-sm font-medium font-['Lato'] capitalize">
              Total Order
            </h6>
          </div>
        </div>
      </div>
      <div className="mt-6">
        {orders && (
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

export default CustomerView;
