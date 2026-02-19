import { useState } from "react";
import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";

interface InputFieldsProps {
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  setValue?: (value: string) => void; // ✅ made optional
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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <input
        type={inputType}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          if (typeof setValue === "function") {
            setValue(e.target.value); // ✅ safe check
          }
        }}
        className="border border-black px-4.5 h-13 w-80.5 rounded-[20px] shadow-lg placeholder-gray-900 pr-12"
      />

      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-4"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            {showPassword ? (
              <HiMiniEye size={20} />
            ) : (
              <HiMiniEyeSlash size={20} />
            )}
          </div>
        </button>
      )}
    </div>
  );
}

export default InputFields;
