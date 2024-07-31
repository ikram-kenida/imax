import { TabsContent } from "@radix-ui/react-tabs";
import { FormGroup } from "../ui/form-group";
import { Button } from "../ui/button";
import { useState } from "react";
import axiosClient from "@/axios";
import { useTranslation } from "react-i18next";

export const ChangePassword = () => {
  const [errors, setErrors] = useState<Record<string, string | null> | null>();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "profile",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    axiosClient
      .post("/change-password", formData)
      .then(() => {
        event.currentTarget?.reset();
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

  return (
    <TabsContent value="change-password">
      <h3 className="text-neutral-700 text-[28px] font-normal leading-[33.50px] tracking-wide">
       {t("change")}
      </h3>
      <form action="#" method="post" className="mt-10" onSubmit={onSubmit}>
        <div className="flex flex-col gap-5">
          <FormGroup
            id="old_password"
            placeholder={t("old password")}
            icon="password"
            type="password"
            error={errors?.old_password}
          />
          <hr className="w-full h-px bg-gray-200 my-3" />
          <FormGroup
            id="new_password"
            placeholder={t("new password")}
            icon="password"
            type="password"
            error={errors?.new_password}
          />
          <FormGroup
            id="new_password_confirmation"
            placeholder={t("new password confirmation")}
            icon="password"
            type="password"
            error={errors?.new_password_confirmation}
          />
        </div>
        <Button
          className="w-[275px] h-[54px] bg-blue-600 rounded-lg mt-12 disabled:opacity-70"
          type="submit"
          disabled={loading}
        >
          <span className="text-white text-lg font-medium">
            {loading ? "Loading..." : "Change Password"}
          </span>
        </Button>
      </form>
    </TabsContent>
  );
};
