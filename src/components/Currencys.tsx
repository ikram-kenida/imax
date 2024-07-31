import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loading } from "./ui/loading";
import { useStateContext } from "@/contexts/ContextProvider";

export const Currencys = () => {
  const { currency, setCurrency } = useStateContext();
  const [loading, setLoading] = useState(false);
  const currencys = ["usd", "sar", "aed", "kwd", "eur", "dzd", "egp", "imx"];

  const handleCurrencyChange = (value: string) => {
    if (value == currency) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setCurrency(value);
    localStorage.setItem("currency", value);
  };

  return (
    <>
      {loading && <Loading />}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-[66px] p-3 gap-2 rounded border border-black/15 bg-white ms-1 uppercase text-sm font-medium">
            {currency}
            <img
              src="/icons/arrow-down.svg"
              alt="arrow down"
              width={10}
              height={12}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[66px] bg-white p-0">
          <DropdownMenuRadioGroup
            value={currency}
            onValueChange={handleCurrencyChange}
          >
            {currencys.map((currency) => (
              <DropdownMenuRadioItem
                value={currency}
                className="flex gap-2 justify-start hover:bg-gray-100"
                key={currency}
              >
                <span className="text-neutral-800 text-xs font-bold font-['Cairo'] uppercase">
                  {currency}
                </span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
