import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChangeEvent } from "react";

interface FormGroupProps {
  title: string;
  name: string;
  placeholder: string;
  type: string;
  dir?: "ltr" | "rtl";
  error?: string | null;
  onChange?: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  date?: Date | string;
  setDate?: (date: Date) => void;
  value?: string|number;
}

export const FormGroup = ({
  title,
  name,
  placeholder,
  type,
  dir = "ltr",
  onChange,
  error,
  date,
  setDate,
  value,
}: FormGroupProps) => {
  const className =
    "w-full px-4 py-3 mt-2 bg-stone-50 rounded-xl border border-zinc-100 placeholder:text-neutral-400 placeholder:text-sm placeholder:font-mediumm placeholder:font-['Lato'] text-stone-950 text-base font-mediumm font-['Lato']";
  const selectedDate = date ? new Date(date) : undefined;

  return (
    <div dir={dir} className="w-full">
      <label
        htmlFor={name}
        className="text-stone-950 text-base font-semibold font-['Lato']"
      >
        {title}
      </label>
      {type == "textarea" ? (
        <textarea
          id={name}
          name={name}
          className={cn(className, "h-20 appearance-none")}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={value}
        ></textarea>
      ) : type == "date" ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button className={cn(className, "justify-between")}>
              <img
                src="/icons/calender.svg"
                alt="calender"
                className="mr-2 h-4 w-4"
              />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setDate && setDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className={cn(className)}
          onChange={onChange}
          defaultValue={value}
        />
      )}
      {error && (
        <div className="flex gap-2 items-center mt-2 ms-2">
          <img
            src="/icons/error-icon.svg"
            alt="error-icon"
            width={15}
            height={15}
          />
          <p className="text-red-500 text-base font-normal">{error}</p>
        </div>
      )}
    </div>
  );
};
