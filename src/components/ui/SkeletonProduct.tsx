import { Skeleton } from "./skeleton";

export const SkeletonProduct = () => {
  return (
    <div className="flex py-3 px-4 gap-2 flex-col items-center justify-center rounded-xl bg-white shadow-2xl">
      <Skeleton className="w-full h-[281px]" />
      <div className="w-full">
        <Skeleton className="w-3/4 h-[28px]" />
        <Skeleton className="w-full line-clamp-2 h-[16px] mt-2" />
        <div className="flex mt-3 justify-between items-end">
          <Skeleton className="w-1/4 h-[28px]" />
          <Skeleton className="w-1/4 h-[36px]" />
        </div>
      </div>
    </div>
  );
};
