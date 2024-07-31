import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InputEditor from "./InputEditor";
import { ProductInput } from "@/types/Dashboard";

interface Props {
  inputs: ProductInput[];
  setInputs: Dispatch<SetStateAction<ProductInput[]>>;
}

export const ProductInputs = ({ inputs, setInputs }: Props) => {
  const [myInputs, setMyInputs] = useState<ProductInput[]>([...inputs]);

  const addInput = (index?: number): void => {
    index = index !== undefined ? index : myInputs.length;
    const newInput: ProductInput = {
      id: uuidv4(),
      title_en: "",
      title_fr: "",
      title_ar: "",
      type: "text",
      data: {},
    };
    const updatedInputs = [...myInputs];
    updatedInputs.splice(index, 0, newInput);
    setMyInputs(updatedInputs);
  };

  const inputChange = (input: ProductInput): void => {
    if (!input) return;
    const newInputs = myInputs.map((q) =>
      q.id === input.id ? { ...input } : q
    );
    setMyInputs(newInputs);
  };

  const deleteInput = (input: ProductInput): void => {
    const newInputs = myInputs.filter((q) => q.id !== input.id);
    setMyInputs(newInputs);
  };

  useEffect(() => {
    setInputs(myInputs);
  }, [myInputs]);

  return (
    <div className="px-6 py-6 bg-white rounded-3xl mt-6">
      <div className="flex justify-between">
        <h5 className="text-neutral-400 text-lg font-semibold font-['Lato']">
          Inputs
        </h5>
        <Button onClick={() => addInput()}>
          <img src="/icons/add.svg" alt="add input" />
        </Button>
      </div>
      <div className="mt-6">
        {myInputs.length ? (
          <div className="flex flex-col gap-4">
            {myInputs.map((c) => (
              <InputEditor
                key={c.id}
                input={c}
                inputChange={inputChange}
                deleteInput={deleteInput}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-center py-4">
            You don't have any inputs created
          </div>
        )}
      </div>
    </div>
  );
};
