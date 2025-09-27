import React, { type ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string; // optional, default width
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-6xl",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`bg-white dark:bg-[#222] border rounded-lg shadow-xl w-full ${width} max-h-[90vh] overflow-auto p-6 relative`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Body */}
        <div className="flex flex-wrap gap-6">
          {children}
        </div>

        {/* Footer */}
        {/* <div className="mt-6 flex justify-end">
          <Button onClick={onClose} className="text-white">Close</Button>
        </div> */}
      </div>
    </div>
  );
};
