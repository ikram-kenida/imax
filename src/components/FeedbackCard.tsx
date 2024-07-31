import { cn } from "@/lib/utils";
import { ProductReviews } from "@/types";
import { useTranslation } from "react-i18next";

export const FeedbackCard = ({ review }: { review: ProductReviews }) => {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const title =
    language == "en"
      ? review?.title_product.title_en
      : language == "fr"
      ? review?.title_product.title_fr
      : review?.title_product.title_ar;

  return (
    <div className="flex flex-col gap-5 bg-white rounded-xl p-6">
      <div className={cn(language == "en" ? "text-left" : "text-right")}>
        <p className="text-black/60 font-medium text-base line-clamp-5 ont-['Lato']">
          {review.review}
        </p>
      </div>
      <div className="block">
        <div className="flex justify-between items-center">
          <h4 className="text-black/85 text-2xl font-semibold">
            {review.username}
          </h4>
          <div className="flex items-center gap-1">
            <span className="text-neutral-400 text-base font-medium font-['Lato']">
              {review.rate}
            </span>
            <img src="/icons/star.svg" alt="star" width={16} height={16} />
          </div>
        </div>
        <span className="text-neutral-400 text-base font-normal font-['Lato'] mt-2">
          {title}
        </span>
      </div>
    </div>
  );
};
