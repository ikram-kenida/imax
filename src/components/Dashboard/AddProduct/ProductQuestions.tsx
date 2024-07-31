import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QuestionEditor from "./QuestionEditor";
import { Button } from "@/components/ui/button";
import { ProductQuestion } from "@/types/Dashboard";

interface Props {
  questions: ProductQuestion[];
  setQuestions: Dispatch<SetStateAction<ProductQuestion[]>>;
}

export const ProductQuestions = ({ questions, setQuestions }: Props) => {
  const [myQuestions, setMyQuestions] = useState<ProductQuestion[]>(questions);

  const addQuestion = (index?: number): void => {
    index = index !== undefined ? index : myQuestions.length;
    const newQuestion: ProductQuestion = {
      id: uuidv4(),
      question_en: "",
      question_ar: "",
      question_fr: "",
      answer_en: "",
      answer_fr: "",
      answer_ar: "",
    };
    const updatedQuestions = [...myQuestions];
    updatedQuestions.splice(index, 0, newQuestion);
    setMyQuestions(updatedQuestions);
  };

  const questionChange = (question: ProductQuestion): void => {
    if (!question) return;
    const newQuestions = myQuestions.map((q) =>
      q.id === question.id ? { ...question } : q
    );
    setMyQuestions(newQuestions);
  };

  const deleteQuestion = (question: ProductQuestion): void => {
    const newQuestions = myQuestions.filter((q) => q.id !== question.id);
    setMyQuestions(newQuestions);
  };

  useEffect(() => {
    setQuestions(myQuestions);
  }, [myQuestions]);

  return (
    <div className="px-6 py-6 bg-white rounded-3xl mt-6">
      <div className="flex justify-between">
        <h5 className="text-neutral-400 text-lg font-semibold font-['Lato']">
          Questions
        </h5>
        <Button onClick={() => addQuestion()}>
          <img src="/icons/add.svg" alt="add question" />
        </Button>
      </div>
      <div className="mt-6">
        {myQuestions.length ? (
          <div className="flex flex-col gap-4">
            {myQuestions.map((q) => (
              <QuestionEditor
                key={q.id}
                question={q}
                questionChange={questionChange}
                deleteQuestion={deleteQuestion}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-center py-4">
            You don't have any questions created
          </div>
        )}
      </div>
    </div>
  );
};
