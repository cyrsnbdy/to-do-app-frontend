import { useEffect, useRef } from "react";

interface ModalPopupProps {
  isOpen: boolean;
  title?: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose: () => void;
  autoCloseTime?: number; // in milliseconds (default 3000ms)
}

export default function ModalPopup({
  isOpen,
  title = "Notice",
  message,
  type = "info",
  onClose,
  autoCloseTime = 3000,
}: ModalPopupProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Disable scroll
    document.body.style.overflow = "hidden";

    // Auto close timer
    const timer = setTimeout(() => {
      onClose();
    }, autoCloseTime);

    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, [isOpen, autoCloseTime, onClose]);

  // Close when clicking outside
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onMouseDown={handleOutsideClick}
      className="fixed inset-0 flex items-center justify-center bg-black/20 z-50"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg border-2 border-[#1E319D] p-6 w-full max-w-sm shadow-lg text-center relative"
      >
        {/* Close button (X) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-xl text-[#1E319D] font-semibold my-4">{title}</h2>

        {/* Message */}
        <p className="text-gray-700 mb-6">{message}</p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-3xl w-32 h-10 bg-[#1E319D] text-white hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  );
}
