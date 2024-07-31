import { Button } from "@/components/ui/button";
import Layout from "@/layouts/Layout";
import { useTranslation } from "react-i18next";

const Error404 = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "error404",
  });
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center flex-col text-center">
        <h1 className="md:text-[200px] md:leading-[200px] text-9xl font-bold bg-[linear-gradient(180deg,#1577EB_0%,#063771_100%)] bg-clip-text [-webkit-text-fill-color:transparent]">
          404
        </h1>
        <h2 className="text-black md:text-4xl text-2xl font-semibold mt-5">
          {t("sorry")}
        </h2>
        <p className="text-black md:text-xl text-base font-normal mt-4">
          {t("pageNotFound")}
        </p>
        <Button to="/" className="py-3 px-6 bg-blue-600 rounded-lg mt-6">
          <span className="text-white text-xl font-semibold">{t("backToHome")}</span>
        </Button>
      </div>
    </Layout>
  );
};

export default Error404;
