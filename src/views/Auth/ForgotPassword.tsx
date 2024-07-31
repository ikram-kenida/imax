import axiosClient from "@/axios";
import { Button } from "@/components/ui/button";
import { FormGroup } from "@/components/ui/form-group";
import { useState } from "react";
import { useStateContext } from "@/contexts/ContextProvider";
import { Link } from "react-router-dom";
import { SocialLogin } from "@/components/ui/social-login";
import router from "@/router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const ForgotPassword = () => {
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

    const formData = new FormData(event.currentTarget);

    axiosClient
      .post("/auth/foroget-password", formData)
      .then(({ data }) => {
        setUserEmail(data.email);
        router.navigate("/auth/reset-password");
        toast("Success!", {
          description: data.message || "Login successfully",
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
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-[0.2px] mt-8 rtl:font-['Cairo'] ltr:font-['Lato']">
          {t("resetPassword")}
        </h2>
        <p className="text-sm font-normal text-gray-500 mt-3 rtl:font-['Cairo'] ltr:font-['Lato']">
          {t("enterEmail")}
        </p>
        <form action="#" method="post" onSubmit={onSubmit} className="mt-8">
          <FormGroup
            id="email"
            type="email"
            placeholder={t("email")}
            icon="email"
            error={errors?.email}
          />
          <Button
            className="w-full mt-8 h-[56px] p-2 rounded-xl bg-blue-600 disabled:opacity-70"
            type="submit"
            disabled={loading}
          >
            <span className="text-white font-semibold text-base">
              {loading ? t("loading") : t("confirm")}
            </span>
          </Button>
        </form>
        <div className="flex mt-8 gap-4 items-center w-full">
          <span className="grow h-px bg-green-200" />
          <span className="text-xs font-normal text-gray-500">
            {t("orSignIn")}
          </span>
          <span className="grow h-px bg-green-200" />
        </div>
        <SocialLogin />
        <div className="mt-8 text-center">
          <p className="text-gray-900 text-sm font-semibold">
            {t("dontHaveAccount")}
            <Link to="/auth/signup" className="text-blue-600">
              {t("signUp")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
