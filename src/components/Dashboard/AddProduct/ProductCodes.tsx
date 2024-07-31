import { Button } from "@/components/ui/button";
import { ProductCode } from "@/types/Dashboard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CodeEditor from "./CodeEditor";

interface Props {
  codes: ProductCode[];
  setCodes: Dispatch<SetStateAction<ProductCode[]>>;
}

export const ProductCodes = ({ codes, setCodes }: Props) => {
  const [myCodes, setMyCodes] = useState<ProductCode[]>(codes);

  const addCode = (index?: number): void => {
    index = index !== undefined ? index : myCodes.length;
    const newCode: ProductCode = {
      id: uuidv4(),
      code: "",
      expire_date: "",
    };
    const updatedCodes = [...myCodes];
    updatedCodes.splice(index, 0, newCode);
    setMyCodes(updatedCodes);
  };

  const codeChange = (code: ProductCode): void => {
    if (!code) return;
    const newCodes = myCodes.map((q) => (q.id === code.id ? { ...code } : q));
    setMyCodes(newCodes);
  };

  const deleteCode = (code: ProductCode): void => {
    const newCodes = myCodes.filter((q) => q.id !== code.id);
    setMyCodes(newCodes);
  };

  useEffect(() => {
    setCodes(myCodes);
  }, [myCodes]);

  return (
    <div className="px-6 py-6 bg-white rounded-3xl mt-6">
      <div className="flex justify-between">
        <h5 className="text-neutral-400 text-lg font-semibold font-['Lato']">
          Codes
        </h5>
        <Button onClick={() => addCode()}>
          <img src="/icons/add.svg" alt="add code" />
        </Button>
      </div>
      <div className="mt-6">
        {myCodes.length ? (
          <div className="flex flex-col gap-4">
            {myCodes.map((c) => (
              <CodeEditor
                key={c.id}
                code={c}
                codeChange={codeChange}
                deleteCode={deleteCode}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-center py-4">
            You don't have any codes created
          </div>
        )}
      </div>
    </div>
  );
};
