import axiosClient from "@/axios";
import { Button } from "@/components/ui/button";
import { FormGroup } from "@/components/ui/form-group";
import { useState } from "react";
import { useStateContext } from "@/contexts/ContextProvider";
import router from "@/router";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const Verification = () => {
  const [errors, setErrors] = useState<Record<string, string | null> | null>();
  const { setCurrentUser, setUserToken, setUserEmail } = useStateContext();
  const { userEmail } = useStateContext();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "auth",
  });

  if (!userEmail) return <Navigate to="/auth/login" />;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    formData.append("email", userEmail ?? "");

    axiosClient
      .post("/auth/verification", formData)
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
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

  const resendCode = () => {
    setErrors(null);

    axiosClient
      .post("/auth/resend-code", { email: userEmail })
      .then(({ data }) => {
        if (data.token && data.user) {
          setCurrentUser(data.user);
          setUserToken(data.token);
          return router.navigate("/");
        }
        toast("Success!", {
          description:
            data.message || "Verification code has been resent successfully",
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
        <img
          src="/images/verification.svg"
          alt="verification"
          width={151}
          height={132}
          className="mx-auto"
        />
        <h2 className="text-2xl font-bold tracking-[0.2px] mt-8">
          {t("verifyEmail")}
        </h2>
        <p className="text-sm font-normal text-gray-500 mt-3">
          {t("thankYouCheckEmail")}
        </p>
        <form action="#" method="post" onSubmit={onSubmit} className="mt-8">
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
          <Button
            className="w-full mt-8 h-[56px] p-2 rounded-xl bg-blue-600 disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            <span className="text-white font-semibold text-base">
              {loading ? t("loading") : t("Confirm")}
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

export default Verification;
