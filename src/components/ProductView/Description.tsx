import { ProductDetails } from "@/types";
import { useTranslation } from "react-i18next";

export const Description = ({ product }: { product: ProductDetails }) => {
  const { i18n } = useTranslation();

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-neutral-700 text-base font-medium">
          {i18n.language == "en"
            ? product.description_en
            : i18n.language == "fr"
            ? product.description_fr
            : product.description_ar}
        </p>
        {product.questions.map((question) => (
          <div className="text-start" key={question.id}>
            <h6 className="text-neutral-700 text-base font-medium capitalize">
              {i18n.language == "en"
                ? question.question_en
                : i18n.language == "fr"
                ? question.question_fr
                : question.question_ar}
            </h6>
            <p className="text-zinc-500 text-sm font-medium mt-2">
              {i18n.language == "en"
                ? question.answer_en
                : i18n.language == "fr"
                ? question.answer_fr
                : question.answer_ar}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
