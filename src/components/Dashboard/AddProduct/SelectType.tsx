import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

export const SelectType = ({
  setType,
  type,
}: {
  setType: Dispatch<SetStateAction<string>>;
  type: string;
}) => {
  const types = ["automatic", "manual"];

  return (
    <Select onValueChange={(value) => setType(value)} defaultValue={type}>
      <span className="text-stone-950 text-base font-semibold font-['Lato']">
        Type
      </span>
      <SelectTrigger className="w-full h-auto px-4 py-3 mt-2 bg-stone-50 rounded-xl border border-zinc-100 text-neutral-400 text-sm font-medium font-['Lato']">
        <SelectValue placeholder="Select a Type" />
      </SelectTrigger>
      <SelectContent className="bg-stone-50 rounded-xl border border-zinc-100 text-stone-950">
        <SelectGroup>
          <SelectLabel>Types</SelectLabel>
          {types.map((type: string) => (
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
    </Select>
  );
};
