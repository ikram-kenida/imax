import axiosClient from "@/axios";
import { Button } from "@/components/ui/button";
import { FormGroup } from "@/components/ui/form-group";
import { Toaster } from "@/components/ui/sonner";
import { useStateContext } from "@/contexts/ContextProvider";
import router from "@/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const [errors, setErrors] = useState<Record<string, string | null> | null>();
  const { setCurrentUser, setUserToken, setUserEmail, userEmail } =
    useStateContext();
  const { t } = useTranslation("translation", {
    keyPrefix: "auth",
  });
  const [loading, setLoading] = useState(false);

  if (!userEmail) return <Navigate to="/auth/login" />;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    formData.append("email", userEmail ?? "");

    axiosClient
      .post("/auth/reset-password", formData)
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        router.navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          const finalErrors: any = error.response.data.errors;

          setErrors(finalErrors);
        }
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resendCode = () => {
    setErrors(null);

    axiosClient
      .post("/auth/resend-code-password", { email: userEmail })
      .then(({ data }) => {
        toast("Success!", {
          description:
            data.message || "Verification code has been resent successfully.",
          className: "bg-green-600 border-0",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      })
      .catch((error) => {
        if (error.response && error.response.status == 404) {
          setUserEmail("");
          return router.navigate("/auth/signup");
        }
        toast("Error!", {
          description: error.response?.data?.message || "An error occurred",
          className: "bg-red-600 border-0",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      });
  };

  return (
    <div className="md:w-[511px] sm:w-[450px] w-full rounded-2xl bg-white md:p-10 p-6 shadow">
      <Toaster />
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-[0.2px]">
          {t("newPassword")}
        </h2>
        <p className="text-sm font-normal text-gray-500 mt-3">
          {t("thankYou")}
        </p>
        <form action="#" method="post" onSubmit={onSubmit} className="mt-8">
          <div className="flex flex-col gap-4">
            <FormGroup
              id="code"
              type="text"
              placeholder={t("enterCode")}
              icon="email"
              error={errors?.code}
            />
            {typeof errors == "string" && (
              <div className="flex gap-2 items-center mt-2 ms-2">
                <img
                  src="/icons/error-icon.svg"
                  alt="error-icon"
                  width={15}
                  height={15}
                />
                <p className="text-pink-500 text-base font-normal">{errors}</p>
              </div>
            )}
            <FormGroup
              id="password"
              type="password"
              placeholder={t("enterPassword")}
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
          <Button
            className="w-full mt-8 h-[56px] p-2 rounded-xl bg-blue-600 disabled:opacity-80 disabled:cursor-not-allowed"
            type="submit"
          >
            <span className="text-white font-semibold text-base">
              {loading ? t("loading") : t("confirm")}
            </span>
          </Button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-900 text-sm font-semibold">
            {t("dontReceiveEmail")}{" "}
            <span className="text-blue-600 cursor-pointer" onClick={resendCode}>
              {t("resend")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
