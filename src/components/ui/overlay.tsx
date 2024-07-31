import { cn } from "@/lib/utils";

interface OverlayProps {
  open: boolean;
  onClick: () => void;
  className?: string;
}

export const Overlay = ({ open, onClick, className }: OverlayProps) => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-full bg-black/50 transition-all z-40",
        open ? "visible opacity-100" : "invisible opacity-0",
        className
      )}
      onClick={onClick}
    />
  );
};
