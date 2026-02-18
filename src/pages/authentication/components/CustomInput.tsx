import { useState, type InputHTMLAttributes } from "react";
import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";

interface CustomInputI extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "prefix" | "suffix"
> {
  label: string;
  parentClass?: string;
  inputClass?: string;
}

export default function CustomInput({
  label,
  type = "text",
  parentClass = "",
  inputClass = "",
  ...props
}: CustomInputI) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={`relative flex flex-col ${parentClass}`}>
      {/* Label */}
      <label className="text-base mb-1 font-medium">{label}</label>

      {/* Input */}
      <input
        type={inputType}
        className={`
          border border-black 
          px-4.5 h-13 w-full 
          rounded-[20px] 
          shadow-lg 
          placeholder-gray-900 
          pr-12
          outline-none
          focus:ring-2 focus:ring-[#1E319D]
          ${inputClass}
        `}
        {...props}
      />

      {/* Password Toggle */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-10.5 flex items-center"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <HiMiniEye size={20} />
          ) : (
            <HiMiniEyeSlash size={20} />
          )}
        </button>
      )}
    </div>
  );
}
