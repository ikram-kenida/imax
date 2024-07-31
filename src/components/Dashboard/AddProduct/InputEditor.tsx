import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Option, ProductInput } from "@/types/Dashboard";
import { FormGroup } from "../ui/FormGroup";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InputEditor({ input, deleteInput, inputChange }: any) {
  const [model, setModel] = useState<ProductInput>({
    ...input,
    data: typeof input.data == "string" ? JSON.parse(input.data) : {},
  });
  const inputTypes = ["text", "select"];

  useEffect(() => {
    inputChange(model);
  }, [model]);

  function shouldHaveOptions(type?: string): boolean {
    type = type || model.type;
    return ["select"].includes(type);
  }

  function onTypeChange(type: string): void {
    const newModel: ProductInput = {
      ...model,
      type: type,
    };
    if (!shouldHaveOptions(model.type) && shouldHaveOptions(type)) {
      if (!model.data?.options) {
        newModel.data = {
          options: [{ uuid: uuidv4(), option: "" }],
        };
      }
    }
    setModel(newModel);
  }

  function addOption(): void {
    if (model.data?.options) {
      model.data?.options?.push({
        uuid: uuidv4(),
        option: "",
      });
      setModel({ ...model });
    }
  }

  function deleteOption(op: Option): void {
    if (model.data) {
      model.data.options = model.data.options?.filter(
        (option) => option.uuid !== op.uuid
      );
      setModel({ ...model });
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-end gap-4">
          <div className="grow">
            <FormGroup
              type="text"
              name={"title_en_" + model.id}
              placeholder="Title"
              title="Title"
              onChange={(event) =>
                setModel({
                  ...model,
                  title_en: event.target.value,
                })
              }
              value={model.title_en}
            />
          </div>
          <div className="grow">
            <FormGroup
              type="text"
              name={"title_fr_" + model.id}
              placeholder="Titre"
              title="Titre"
              onChange={(event) =>
                setModel({
                  ...model,
                  title_fr: event.target.value,
                })
              }
              value={model.title_fr}
            />
          </div>
          <div className="grow">
            <FormGroup
              type="text"
              name={"title_ar_" + model.id}
              placeholder="العنوان"
              title="العنوان"
              dir="rtl"
              onChange={(event) =>
                setModel({
                  ...model,
                  title_ar: event.target.value,
                })
              }
              value={model.title_ar}
            />
          </div>
          <Button onClick={() => deleteInput(input)} className="w-8 h-12">
            <img src="/icons/delete.svg" alt="delete code" />
          </Button>
        </div>
        <div className="w-full">
          <Select
            onValueChange={(type: string) => onTypeChange(type)}
            defaultValue={model.type ?? inputTypes[0]}
          >
            <span className="text-stone-950 text-base font-semibold font-['Lato']">
              Type
            </span>
            <SelectTrigger className="w-full h-auto px-4 py-3 mt-2 bg-stone-50 rounded-xl border border-zinc-100 text-neutral-400 text-sm font-medium font-['Lato']">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent className="bg-stone-50 rounded-xl border border-zinc-100 text-stone-950">
              <SelectGroup>
                <SelectLabel>Type Input</SelectLabel>
                {inputTypes &&
                  inputTypes.map((type: string) => (
                    <SelectItem
                      value={type}
                      key={type}
                      className="cursor-pointer capitalize"
                    >
                      {type}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>{" "}
        </div>
        <div className="w-full">
          {shouldHaveOptions() && (
            <div className="mt-5">
              <div className="flex justify-between items-center mb-5">
                <h5 className="text-neutral-400 text-base font-semibold font-['Lato']">
                  Option
                </h5>
                <Button onClick={() => addOption()}>
                  <img
                    src="/icons/add.svg"
                    alt="add input"
                    width={18}
                    height={18}
                  />
                </Button>
              </div>

              {model.data?.options?.length === 0 && (
                <div className="text-gray-400 text-xs text-center py-4">
                  You don't have any options defined
                </div>
              )}

              {model.data?.options && model.data?.options.length > 0 && (
                <div className="flex flex-col justify-center items-end gap-3">
                  {model.data.options.map((op) => (
                    <div key={op.uuid} className="flex items-end gap-4 w-full">
                      <FormGroup
                        type="text"
                        name={"option_" + op.uuid}
                        placeholder="Option"
                        title="Option"
                        value={op.option}
                        onChange={(ev) => {
                          op.option = ev.target.value;
                          setModel({ ...model });
                        }}
                      />
                      <Button
                        onClick={() => deleteOption(op)}
                        className="w-8 h-12"
                      >
                        <img src="/icons/delete.svg" alt="delete option" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
