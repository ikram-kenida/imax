import axiosClient from "@/axios";
import { PageTitle } from "@/components/Dashboard/ui/PageTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loading } from "@/components/ui/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductView } from "@/types/Dashboard";
import { formatDate } from "date-fns";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useSWR from "swr";

const ProductDasboard = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const link = "/dashboard/products/view/" + slug;

  const fetcher = async () => {
    const response = await axiosClient.get(link);
    return response.data;
  };

  const { data, isLoading, mutate } = useSWR(link, fetcher);
  const { product }: { product: ProductView } = data ?? {};

  if (isLoading && !product) {
    return <Loading />;
  }

  const handleDeleteReview = (id: number | string) => {
    setLoading(true);
    axiosClient
      .post("/dashboard/reviews/" + id)
      .then((response) => {
        toast("Success!", {
          description: response.data.message || "Review Deleted Successfully",
          className: "bg-green-600 border-0",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        mutate();
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

  const handleToggleReviewPublish = (id: string | number) => {
    setLoading(true);
    axiosClient
      .post("/dashboard/reviews/publish/" + id)
      .then((response) => {
        toast("Success!", {
          description: response.data.message || "Review Successfully",
          className: "bg-green-600 border-0",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        mutate();
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

  

  return (
    <section className="w-full">
      <PageTitle
        title="Product Details"
        array={[
          {
            path: "/dashboard/products",
            name: "Products",
          },
          {
            name: "Product Details",
          },
        ]}
      />
      <div className="mt-5">
        <div className="p-6 bg-white shadow rounded-xl">
          <div className="flex items-start gap-4">
            <img
              src={product?.images && product.images[0].image}
              alt="product image"
              className="object-cover w-64 h-64 rounded-2xl"
            />
            <div className="flex-1">
              <h3 className="text-stone-800 text-3xl font-bold font-['Lato']">
                {product.title_en}
              </h3>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-stone-800 text-sm font-medium font-['Lato'] flex gap-1">
                  {product.rate}{" "}
                  <img
                    src="/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                </span>
                <span className="text-stone-800 text-sm font-medium font-['Lato']">
                  {product.comments} Comments
                </span>
              </div>
              <span className="my-3 text-blue-600 text-base font-bold font-['Lato']">
                {product.category.category_en}
              </span>
              <p className="text-neutral-600 text-base font-medium font-['Lato']">
                {product.description_en}
              </p>
            </div>
          </div>
          <div className="grid items-stretch grid-cols-4 gap-3 mt-3">
            <div className="col-span-2 px-3 py-6 bg-indigo-50 rounded-xl">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex items-center justify-start gap-3">
                  {product.images?.map((image) => (
                    <img
                      src={image.image}
                      alt="image product"
                      width={60}
                      height={60}
                      className="object-cover w-[60px] h-[60px] rounded-lg"
                      key={image.id}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex flex-col items-center justify-center col-span-1 px-3 py-6 bg-indigo-50 rounded-xl">
              <span className="text-stone-950 text-3xl font-bold font-['Lato']">
                {product.sales_count}
              </span>
              <span className="text-neutral-500 text-sm font-medium font-['Lato'] capitalize">
                Sales Count
              </span>{" "}
            </div>
            <div className="flex flex-col items-center justify-center col-span-1 px-3 py-6 bg-indigo-50 rounded-xl">
              <span className="text-stone-950 text-3xl font-bold font-['Lato']">
                {product.seen}
              </span>
              <span className="text-neutral-500 text-sm font-medium font-['Lato'] capitalize">
                Product Views
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
      <Accordion type="multiple" className="w-full mt-5">
        {product.codes && product.codes.length > 0 && (
          <AccordionItem
            value="item-1"
            className="p-3 bg-white shadow rounded-xl"
          >
            <AccordionTrigger className="text-neutral-500 text-base font-medium py-0 font-['Lato']">
              Codes
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-6 mt-6">
              {product.codes?.map((code) => {
                const expireDate = new Date(code.expire_date);
                const today = new Date();
                const expired = code.expire || today >= expireDate;

                return (
                  <div className="flex flex-col gap-3" key={code.id}>
                    <h5 className="text-neutral-600 text-base font-medium font-['Lato']">
                      {code.code}
                    </h5>
                    <div className="flex justify-between">
                      <div className="relative">
                        <span className="text-neutral-400 text-xs font-medium font-['Lato']">
                          Expiration Date:
                        </span>
                        <span className="ms-2 text-neutral-600 text-xs font-medium font-['Lato']">
                          {expired
                            ? "Expired"
                            : formatDate(expireDate, "dd/MM/yyyy")}
                        </span>
                      </div>
                      {expired && (
                        <div className="relative">
                          <span className="text-neutral-400 text-xs font-medium font-['Lato']">
                            User Email:
                          </span>
                          <span className="ms-2 text-neutral-600 text-xs font-medium font-['Lato']">
                            {code?.useremail}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        )}
        <AccordionItem
          value="item-2"
          className="p-3 mt-5 bg-white shadow rounded-xl"
        >
          <AccordionTrigger className="text-neutral-500 text-base font-medium py-0 font-['Lato']">
            Questions
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-6 mt-6">
            {product.questions?.map((question) => (
              <div className="flex flex-col gap-2" key={question.id}>
                <h5 className="text-neutral-600 text-base font-medium font-['Lato']">
                  {question.question_en}
                </h5>
                <p className="text-neutral-600 text-xs font-medium font-['Lato']">
                  {question.answer_en}
                </p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="p-3 mt-5 bg-white shadow rounded-xl"
        >
          <AccordionTrigger className="text-neutral-500 text-base font-medium py-0 font-['Lato']">
            Reviews
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3 mt-6">
            {product.reviews?.map((review) => (
              <div
                className="relative p-3 border rounded-xl border-zinc-100"
                key={review.id}
              >
                <h5 className="text-stone-800 text-base font-bold font-['Lato']">
                  {review.username}
                </h5>
                <div className="flex gap-1 mt-3">
                  <span className="text-neutral-500 text-sm font-bold font-['Lato'] flex">
                    {review.rate}
                    <img
                      src="/icons/star.svg"
                      alt="svg"
                      width={12}
                      height={12}
                      className="ms-0.5"
                    />
                  </span>
                  <span className="text-neutral-500 text-sm font-bold font-['Lato']">
                    {review.date}
                  </span>
                </div>
                <p className="text-neutral-500 text-sm font-bold font-['Lato'] mt-2">
                  {review.review}
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild disabled={loading}>
                    <Button className="absolute right-2 top-2">
                      {loading ? (
                        <span className="text-xs font-normal font-['Lato']">
                          Loading..
                        </span>
                      ) : (
                        <img
                          src="/icons/points.svg"
                          alt="points"
                          width={15}
                          height={20}
                        />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col gap-2 px-2 py-1 bg-white border rounded-md">
                    <DropdownMenuItem
                      className="flex gap-2"
                      onClick={() => handleToggleReviewPublish(review.id)}
                    >
                      <img
                        src="/icons/publish.svg"
                        alt="publish"
                        width={24}
                        height={24}
                      />
                      <span className="text-blue-600 font-medium text-base font-['Lato']">
                        {review.publish ? "UnPublished" : "Published"}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex gap-2"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      <img
                        src="/icons/delete.svg"
                        alt="publish"
                        width={20}
                        height={20}
                      />
                      <span className="text-red-600 font-medium text-base font-['Lato']">
                        Delete
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="w-full p-3 mt-5 bg-white shadow rounded-xl">
        <h4 className="text-neutral-500 text-base font-medium font-['Lato']">
          Sold
        </h4>
        <Table className="mt-6">
          <TableHeader>
            <TableRow className="border-b bg-stone-50 border-zinc-100">
              <TableHead colSpan={3} className="px-2 py-4 text-start">
                <span className="text-slate-500 text-sm font-medium font-['Lato'] capitalize">
                  User name
                </span>
              </TableHead>
              <TableHead colSpan={1} className="px-2 py-4 text-center">
                <span className="text-slate-500 text-sm font-medium font-['Lato'] capitalize">
                  Email
                </span>
              </TableHead>
              <TableHead colSpan={1} className="px-2 py-4 text-center">
                <span className="text-slate-500 text-sm font-medium font-['Lato'] capitalize">
                  Date
                </span>
              </TableHead>
              <TableHead colSpan={1} className="px-2 py-4 text-center">
                <span className="text-slate-500 text-sm font-medium font-['Lato'] capitalize">
                  Action
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product?.customers?.map((user) => (
              <TableRow
                key={user.id}
                className="bg-white border-b border-zinc-100"
              >
                <TableCell colSpan={3} className="px-2 py-4 text-start">
                  <span className="text-xs font-medium text-center text-stone-950">
                    {user.name}
                  </span>
                </TableCell>
                <TableCell colSpan={1} className="px-2 py-4 text-center">
                  <span className="text-xs font-medium text-center text-stone-950">
                    {user.email}
                  </span>
                </TableCell>
                <TableCell colSpan={1} className="px-2 py-4 text-center">
                  <span className="text-xs font-medium text-center text-stone-950">
                    {user.date}
                  </span>
                </TableCell>
                <TableCell colSpan={1} className="px-2 py-4 text-center">
                  <Button className="w-full">
                    <img
                      src="/icons/eye-view.svg"
                      alt="eye view"
                      width={18}
                      height={18}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ProductDasboard;
