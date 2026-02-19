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

  const typeStyles = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <div
      onMouseDown={handleOutsideClick}
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 animate-fadeIn"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-4xl p-8 w-[400px] shadow-2xl text-center transform transition-all duration-200 scale-100"
      >
        {/* Title Badge */}
        <div
          className={`inline-block px-4 py-1 rounded-full text-sm mb-4 ${typeStyles[type]}`}
        >
          {title}
        </div>

        {/* Message */}
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}
