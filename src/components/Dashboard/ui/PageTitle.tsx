import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

interface PageTitleProps {
  title: string;
  array?: {
    name: string;
    path?: string;
  }[];
}

export const PageTitle = ({ title, array }: PageTitleProps) => {
  return (
    <div>
      <h3 className="text-neutral-600 text-3xl font-bold font-['Lato']">
        {title}
      </h3>
      <Breadcrumb className="mt-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link
              to="/dashboard"
              className="text-blue-600 text-base font-semibold font-['Lato']"
            >
              Dashboard
            </Link>
          </BreadcrumbItem>
          {array &&
            array.map((item, index) => (
              <Fragment key={index}>
                <BreadcrumbSeparator className="mt-1" />
                {item.path ? (
                  <BreadcrumbItem key={item.name}>
                    <Link
                      to={item.path}
                      className="text-blue-600 text-base font-semibold font-['Lato']"
                    >
                      {item.name}
                    </Link>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbPage key={item.name}>
                    <span className="text-neutral-600 text-base font-semibold font-['Lato']">
                      {item.name}
                    </span>
                  </BreadcrumbPage>
                )}
              </Fragment>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
