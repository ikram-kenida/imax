import { HashLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[9999] flex justify-center items-center bg-white">
      <HashLoader color="#1577EB" />
    </div>
  );
};
