import axiosClient from "@/axios";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormGroup } from "@/components/ui/form-group";
import { SocialLogin } from "@/components/ui/social-login";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "@/contexts/ContextProvider";
import router from "@/router";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [errors, setErrors] = useState<Record<string, string | null> | null>();
  const { setCurrentUser, setUserToken, setUserEmail } = useStateContext();
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
      .post("/auth/login", formData)
      .then(({ data }) => {
        router.navigate("/");
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          const finalErrors: any = error.response.data.errors;

          setErrors(finalErrors);
        }
        if (error.response && error.response.data.verify_email == false) {
          setUserEmail(error.response.data.email);
          return router.navigate("/auth/verification");
        }
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="md:w-[511px] sm:w-[450px] w-full rounded-2xl bg-white md:p-10 p-6 shadow">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-[0.2px]">{t("signIn")}</h2>
        <p className="text-sm font-normal text-gray-500 mt-3">
          {t("welcomeBack")}
        </p>
        <form action="#" method="post" onSubmit={onSubmit} className="mt-8">
          {typeof errors == "string" && (
            <div className="flex gap-2 items-center w-full py-1 px-2 rounded bg-red-500/10 mb-5">
              <img
                src="/icons/error-icon.svg"
                alt="error-icon"
                width={15}
                height={15}
              />
              <p className="text-red-500 text-base font-normal">{errors}</p>
            </div>
          )}
          <div className="flex flex-col gap-4">
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
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {t("rememberMe")}
                </label>
              </div>
              <Link
                to="/auth/forgot-password"
                className="text-blue-600 text-sm font-bold"
              >
                {t("forgotPassword")}
              </Link>
            </div>
          </div>
          <Button
            className="w-full mt-8 h-[56px] p-2 rounded-xl bg-blue-600 disabled:opacity-70"
            type="submit"
            disabled={loading}
          >
            <span className="text-white font-semibold text-base">
              {loading ? "Loading..." : "Sign In"}
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
        <SocialLogin text={"signin_with"} />
        <div className="mt-8 text-center">
          <p className="text-gray-900 text-sm font-semibold">
            {t("dontHaveAccount")}{" "}
            <Link to="/auth/signup" className="text-blue-600">
              {t("signUp")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
