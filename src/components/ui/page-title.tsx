import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface PageTitleProps {
  page?: string;
  link?: string;
  path?: string;
}

export const PageTitle = ({ page, link, path }: PageTitleProps) => {
  const { t } = useTranslation("translation");

  return (
    <div className="container mt-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/" className="text-zinc-500 text-lg font-normal">
              {t("Home")}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="mt-1 rtl:rotate-180" />
          {path && (
            <>
              <BreadcrumbItem>
                <Link
                  to={path}
                  className="text-zinc-500 text-lg font-normal capitalize"
                >
                  {link}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="mt-1 rtl:rotate-180" />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage className="text-stone-950/90 text-lg font-medium capitalize">
              {page}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
