import { Button } from "@/components/ui/button";
import { FormGroup } from "../ui/FormGroup";
import type { ProductCode } from "@/types/Dashboard";
import { useEffect, useState } from "react";

export default function CodeEditor({ code, deleteCode, codeChange }: any) {
  const [model, setModel] = useState<ProductCode>({ ...code });

  useEffect(() => {
    codeChange(model);
  }, [model]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <FormGroup
            type="text"
            name={"code" + model.id}
            placeholder="Code"
            title="Code"
            onChange={(event) =>
              setModel({
                ...model,
                code: event.target.value,
              })
            }
            value={model.code}
          />
        </div>
        <div className="flex-1">
          <FormGroup
            type="date"
            name={"expire_date_" + model.id}
            placeholder="السؤال"
            title="السؤال"
            dir="rtl"
            onChange={(event) =>
              setModel({
                ...model,
                expire_date: event.target.value,
              })
            }
            date={model.expire_date}
            setDate={(date: Date) =>
              setModel({
                ...model,
                expire_date: date,
              })
            }
          />
        </div>
        <Button onClick={() => deleteCode(code)} className="w-8 h-12">
          <img src="/icons/delete.svg" alt="delete code" />
        </Button>
      </div>
    </div>
  );
}
