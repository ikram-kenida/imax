import { cn } from "@/lib/utils";
import { useState } from "react";

interface FormGroupProps {
  id: string;
  type?: string;
  error?: string | null;
  icon?: string;
  placeholder?: string;
}

export const FormGroup = ({
  id,
  type = "text",
  error,
  icon,
  placeholder,
}: FormGroupProps) => {
  const [changeTypePassword, setChangeTypePassword] = useState<string | null>(
    null
  );
  const classes = cn(
    "w-full h-[56px] py-2 px-12 border rounded-xl text-base text-gray-400 font-normal placeholder:text-base placeholder:text-gray-400 placeholder:font-normal rtl:font-['Cairo'] ltr:font-['Lato']",
    error ? "border-pink-500" : "border-gray-200"
  );

  return (
    <div className="w-full">
      <div className="relative">
        {icon && (
          <span className="absolute top-1/2 -translate-y-1/2 start-4">
            <img src={"/icons/" + icon + ".svg"} alt={icon} />
          </span>
        )}
        {type == "textarea" ? (
          <textarea
            name={id}
            id={id}
            placeholder={placeholder}
            className="w-full h-[99px] border py-2 px-4 border-gray-200 rounded-xl min-h-[120px] text-base text-gray-400 font-normal placeholder:text-base placeholder:text-gray-400 placeholder:font-normal"
          ></textarea>
        ) : type == "password" ? (
          <>
            <input
              type={changeTypePassword ? "text" : "password"}
              name={id}
              id={id}
              placeholder={placeholder}
              className={classes}
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 end-4 cursor-pointer"
              onClick={() =>
                setChangeTypePassword((prevType) =>
                  prevType === "text" ? null : "text"
                )
              }
            >
              {changeTypePassword ? (
                <img src="/icons/eye.svg" alt="eyes" width={20} height={18} />
              ) : (
                <img
                  src="/icons/eyeslash.svg"
                  alt="eyeslash"
                  width={20}
                  height={18}
                />
              )}
            </span>
          </>
        ) : (
          <>
            <input
              type={type}
              name={id}
              id={id}
              placeholder={placeholder}
              className={classes}
            />
          </>
        )}
      </div>
      {error && (
        <div className="flex gap-2 items-center justify-start mt-2 ms-2">
          <img
            src="/icons/error-icon.svg"
            alt="error-icon"
            width={15}
            height={15}
          />
          <p className="text-red-500 text-base font-normal text-start">
            {error}
          </p>
        </div>
      )}
    </div>
  );
};
