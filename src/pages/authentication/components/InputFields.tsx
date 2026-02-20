import { useState } from "react";
import { HiMiniEye, HiMiniEyeSlash, HiOutlineEnvelope } from "react-icons/hi2";

interface InputFieldsProps {
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  setValue?: (value: string) => void;
}

function InputFields({
  type,
  name,
  value,
  placeholder,
  setValue,
}: InputFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative">
      <input
        type={inputType}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          if (typeof setValue === "function") {
            setValue(e.target.value);
          }
        }}
        className="border border-black px-4.5 h-13 w-80.5 rounded-[20px] shadow-lg placeholder-gray-900 pr-12"
      />

      {/* Password Toggle */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center pr-4"
        >
          {showPassword ? (
            <HiMiniEye size={20} />
          ) : (
            <HiMiniEyeSlash size={20} />
          )}
        </button>
      )}

      {/* Email Icon */}
      {type === "email" && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <HiOutlineEnvelope size={20} className="text-gray-500" />
        </div>
      )}
    </div>
  );
}

export default InputFields;
