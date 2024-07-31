import { Button } from "@/components/ui/button";
import { FormGroup } from "../ui/FormGroup";
import type { ProductQuestion } from "@/types/Dashboard";
import { useEffect, useState } from "react";

export default function QuestionEditor({
  question,
  deleteQuestion,
  questionChange,
}: any) {
  const [model, setModel] = useState<ProductQuestion>({ ...question });

  useEffect(() => {
    questionChange(model);
  }, [model]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-4">
        <div className="grow">
          <FormGroup
            type="text"
            name={"question_en_" + model.id}
            placeholder="Question"
            title="Question"
            onChange={(event) =>
              setModel({
                ...model,
                question_en: event.target.value,
              })
            }
            value={model.question_en}
          />
        </div>
        <div className="grow">
          <FormGroup
            type="text"
            name={"question_fr_" + model.id}
            placeholder="Question"
            title="Question fr"
            onChange={(event) =>
              setModel({
                ...model,
                question_fr: event.target.value,
              })
            }
            value={model.question_fr}
          />
        </div>
        <div className="grow">
          <FormGroup
            type="text"
            name={"question_ar_" + model.id}
            placeholder="السؤال"
            title="السؤال"
            dir="rtl"
            onChange={(event) =>
              setModel({
                ...model,
                question_ar: event.target.value,
              })
            }
            value={model.question_ar}
          />
        </div>
        <Button onClick={() => deleteQuestion(question)} className="w-8 h-12">
          <img src="/icons/delete.svg" alt="delete question" />
        </Button>
      </div>
      <div className="w-full">
        <FormGroup
          type="textarea"
          name={"answer_en_" + model.id}
          placeholder="Answer"
          title="Answer"
          onChange={(event) =>
            setModel({
              ...model,
              answer_en: event.target.value,
            })
          }
          value={model.answer_en}
        />
      </div>
      <div className="w-full">
        <FormGroup
          type="textarea"
          name={"answer_fr_" + model.id}
          placeholder="Répondre"
          title="Répondre"
          onChange={(event) =>
            setModel({
              ...model,
              answer_fr: event.target.value,
            })
          }
          value={model.answer_fr}
        />
      </div>
      <div className="w-full">
        <FormGroup
          type="textarea"
          name={"answer_ar_" + model.id}
          placeholder="الاجابة"
          title="الاجابة"
          dir="rtl"
          onChange={(event) =>
            setModel({
              ...model,
              answer_ar: event.target.value,
            })
          }
          value={model.answer_ar}
        />
      </div>
    </div>
  );
}
