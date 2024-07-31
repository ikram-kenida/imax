import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loading } from "./ui/loading";

const languages = [
  { code: "en", name: "English", flag: "/images/en.png" },
  { code: "ar", name: "العربية", flag: "/images/ar.png" },
  { code: "fr", name: "French", flag: "/images/fr.png" },
];

export const SelectLang = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = (value: string) => {
    if (value === selectedLanguage) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = selectedLanguage;
    localStorage.setItem("language", selectedLanguage);
  }, [selectedLanguage]);

  return (
    <>
      {loading && <Loading />}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-[120px] p-3 gap-2 rounded border border-black/15 bg-white ms-4">
            {languages.map(
              (lang) =>
                selectedLanguage === lang.code && (
                  <Fragment key={lang.code}>
                    <img
                      src={lang.flag}
                      alt={lang.code}
                      width={30}
                      height={19}
                    />
                    <span className="text-neutral-800 text-sm font-bold font-['Cairo']">
                      {lang.name}
                    </span>
                  </Fragment>
                )
            )}
            <img
              src="/icons/arrow-down.svg"
              alt="arrow down"
              width={10}
              height={12}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[120px] p-0 bg-white">
          <DropdownMenuRadioGroup
            value={selectedLanguage}
            onValueChange={handleLanguageChange}
          >
            {languages.map((lang) => (
              <DropdownMenuRadioItem
                key={lang.code}
                value={lang.code}
                className="flex gap-2 justify-center hover:bg-stone-100"
              >
                <span className="text-neutral-800 text-xs font-bold font-['Cairo']">
                  {lang.name}
                </span>
                <img src={lang.flag} alt={lang.code} width={30} height={19} />
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
