import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  Pagination,
} from "@/components/ui/pagination";

interface PaginationContainerProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationContainer: React.FC<PaginationContainerProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers: JSX.Element[] = [];
    const maxVisiblePages: number =
      window.innerWidth >= 1024
        ? 8
        : window.innerWidth >= 768
        ? 6
        : window.innerWidth >= 600
        ? 5
        : 4;

    let startPage: number = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage: number = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    } else if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    }

    if (startPage > 2) {
      pageNumbers.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      const active: boolean = i === currentPage;
      pageNumbers.push(
        <PaginationItem key={i}>
          <Button
            onClick={() => onPageChange(i)}
            className={cn(
              "py-2 px-3 rounded-md",
              active && "bg-blue-600 bg-opacity-20"
            )}
          >
            <span className="text-blue-600 text-xs font-medium leading-none tracking-wide">
              {i}
            </span>
          </Button>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <Pagination dir="ltr">
      <PaginationContent className="flex items-center gap-3">
        <PaginationItem className="md:block hidden">
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            className="group"
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M10.757 12L15.707 16.95C15.8026 17.0422 15.8787 17.1526 15.9311 17.2746C15.9836 17.3966 16.0111 17.5278 16.0123 17.6606C16.0135 17.7934 15.9882 17.9251 15.9379 18.048C15.8876 18.1708 15.8133 18.2825 15.7194 18.3764C15.6256 18.4703 15.5139 18.5445 15.391 18.5948C15.2681 18.6451 15.1364 18.6704 15.0036 18.6692C14.8709 18.6681 14.7396 18.6405 14.6176 18.5881C14.4956 18.5357 14.3853 18.4595 14.293 18.364L8.63605 12.707C8.44858 12.5195 8.34326 12.2652 8.34326 12C8.34326 11.7348 8.44858 11.4805 8.63605 11.293L14.293 5.636C14.4817 5.45384 14.7343 5.35305 14.9964 5.35532C15.2586 5.3576 15.5095 5.46277 15.6949 5.64818C15.8803 5.83359 15.9854 6.0844 15.9877 6.3466C15.99 6.60879 15.8892 6.8614 15.707 7.05L10.757 12Z"
                className="fill-blue-600 group-disabled:fill-zinc-500"
              />
            </svg>
          </Button>
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem className="md:block hidden">
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            className="group"
            disabled={currentPage === totalPages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M13.3142 12.071L8.36421 7.12098C8.18205 6.93238 8.08126 6.67978 8.08353 6.41758C8.08581 6.15538 8.19098 5.90457 8.37639 5.71916C8.5618 5.53375 8.81261 5.42859 9.07481 5.42631C9.337 5.42403 9.58961 5.52482 9.77821 5.70698L15.4352 11.364C15.6227 11.5515 15.728 11.8058 15.728 12.071C15.728 12.3361 15.6227 12.5905 15.4352 12.778L9.77821 18.435C9.58961 18.6171 9.337 18.7179 9.07481 18.7157C8.81261 18.7134 8.5618 18.6082 8.37639 18.4228C8.19098 18.2374 8.08581 17.9866 8.08353 17.7244C8.08126 17.4622 8.18205 17.2096 8.36421 17.021L13.3142 12.071Z"
                className="fill-blue-600 group-disabled:fill-zinc-500"
              />
            </svg>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
