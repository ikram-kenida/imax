import axiosClient from "@/axios";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormGroup } from "@/components/ui/form-group";
import { SocialLogin } from "@/components/ui/social-login";
import { Toaster } from "@/components/ui/sonner";
import { useStateContext } from "@/contexts/ContextProvider";
import router from "@/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const [errors, setErrors] = useState<Record<string, string | null> | null>();
  const { setUserEmail } = useStateContext();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "auth",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(null);
    setLoading(true);

    if (
      event.currentTarget.agreeTermsCheckbox.getAttribute("data-state") !==
      "checked"
    ) {
      setLoading(false);
      return setErrors({ agreeTermsCheckbox: "Please agree to the terms." });
    }

    const formData = new FormData(event.currentTarget);

    axiosClient
      .post("/auth/signup", formData)
      .then(({ data }) => {
        setUserEmail(data.email);
        router.navigate("/auth/verification");
        toast("Success!", {
          description: data.message || "Signup successfully",
          className: "bg-green-600 border-0",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          const finalErrors: any = error.response.data.errors;

          setErrors(finalErrors);
        }
        toast("Error!", {
          description: error.response?.data?.message || "An error occurred",
          className: "bg-red-600 border-0",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="md:w-[511px] sm:w-[450px] w-full rounded-2xl bg-white md:p-10 p-6 shadow">
      <Toaster />
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-[0.2px]">{t("signUp")}</h2>
        <form action="#" method="post" onSubmit={onSubmit} className="mt-8">
          <div className="flex flex-col gap-4">
            <FormGroup
              id="name"
              type="text"
              placeholder={t("fullName")}
              icon="user-2"
              error={errors?.name}
            />
            <FormGroup
              id="email"
              type="email"
              placeholder={t("email")}
              icon="email"
              error={errors?.email}
            />
            <FormGroup
              id="password"
              type="password"
              placeholder={t("password")}
              icon="password"
              error={errors?.password}
            />
            <FormGroup
              id="password_confirmation"
              type="password"
              placeholder={t("enterPasswordConfirmation")}
              icon="password"
              error={errors?.password_confirmation}
            />
            <p className="text-xs text-gray-500 font-normal text-left">
              {t("passwordMustHaveAtLeast")}
            </p>
          </div>
          <div className="mt-6">
            <div className="flex items-start space-x-2 text-left">
              <Checkbox id="agreeTermsCheckbox" className="mt-1" />
              <label
                htmlFor="agreeTermsCheckbox"
                className="text-sm font-semibold text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {t("agreeTermsConditions")}{" "}
                <Link to="/terms-of-services" className="text-gray-900">
                  {t("termsConditions")}
                </Link>
              </label>
            </div>
            {errors?.agreeTermsCheckbox && (
              <div className="flex gap-2 items-center mt-2 ms-2">
                <img
                  src="/icons/error-icon.svg"
                  alt="error-icon"
                  width={15}
                  height={15}
                />
                <p className="text-pink-500 text-base font-normal">
                  {errors?.agreeTermsCheckbox}
                </p>
              </div>
            )}
          </div>
          <Button
            className="w-full mt-8 h-[56px] p-2 rounded-xl bg-blue-600 disabled:opacity-80 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            <span className="text-white font-semibold text-base">
              {loading ? t("loading") : t("signUp")}
            </span>
          </Button>
        </form>
        <div className="flex mt-8 gap-4 items-center w-full">
          <span className="grow h-px bg-green-200" />
          <span className="text-xs font-normal text-gray-500">
            {t("orSignUpWith")}
          </span>
          <span className="grow h-px bg-green-200" />
        </div>
        <SocialLogin text={"signup_with"} />
        <div className="mt-8 text-center">
          <p className="text-gray-900 text-sm font-semibold">
            {t("alreadyHaveAccount")}{" "}
            <Link to="/auth/login" className="text-blue-600">
              {t("logIn")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
