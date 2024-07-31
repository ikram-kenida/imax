import axiosClient from "@/axios";
import { PageTitle } from "@/components/Dashboard/ui/PageTitle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loading } from "@/components/ui/loading";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";
import { renderStars } from "@/lib/renderStars";
import { ProductReviews } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

const Feedback = () => {
  const [loading, setLoading] = useState(false);

  const link = "/dashboard/feedback";
  const fetcher = async () => {
    const response = await axiosClient.get(link);

    return response.data;
  };

  const { data, isLoading, mutate } = useSWR(link, fetcher);
  const { reviews }: { reviews: ProductReviews[] } = data ?? [];

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

  if (isLoading) {
    return <Loading />;
  }

  const countByRating = reviews.reduce((acc, review) => {
    acc[review.rate] = (acc[review.rate] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });

  const totalReviews = Object.values(countByRating).reduce((a, b) => a + b, 0);
  const percentages: { [key: number]: number } = {};

  for (let rating = 0; rating <= 5; rating++) {
    percentages[rating] = countByRating[rating]
      ? (countByRating[rating] / totalReviews) * 100
      : 0;
  }

  const progressBars = Object.entries(percentages).map(
    ([rating, percentage]) => (
      <div key={rating} className="flex items-center gap-2">
        <span className="text-stone-950 text-base font-bold font-['Lato']">
          {rating}
        </span>
        <Progress value={percentage} />
      </div>
    )
  );

  return (
    <section className="w-full">
      <Toaster />
      <PageTitle
        title="Feedback"
        array={[
          {
            name: "Feedback",
          },
        ]}
      />
      <div className="p-6 bg-white rounded-3xl shadow mt-6">
        <h3 className="text-neutral-500 text-base font-medium font-['Lato']">
          Rating
        </h3>
        <div className="flex gap-6">
          <div className="w-auto text-center inline-flex flex-col gap-3 justify-center">
            <span className="text-stone-950 text-4xl font-bold font-['Lato']">
              {data?.averageRating}
            </span>
            <div className="flex">
              {renderStars(parseFloat(data?.averageRating.toString()), 16, 16)}
            </div>
          </div>
          <div className="flex flex-col gap-3 flex-1">{progressBars}</div>
        </div>
      </div>
      <div className="p-3 bg-white rounded-xl shadow mt-5">
        <h3 className="text-neutral-500 text-base font-medium font-['Lato']">
          Comments written
        </h3>
        <div className="mt-6 flex flex-col gap-3">
          {reviews?.map((review) => (
            <div
              className="p-3 rounded-xl border border-zinc-100 relative"
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
                  <Button className="right-2 top-2 absolute">
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
                <DropdownMenuContent className="py-1 px-2 bg-white rounded-md border flex flex-col gap-2">
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
        </div>
      </div>
    </section>
  );
};

export default Feedback;
