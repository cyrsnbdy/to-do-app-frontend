import { useState } from "react";
import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";

interface InputFieldsProps {
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  setValue: (value: string) => void;
}

function InputFields({
  type,
  name,
  value,
  placeholder,
  setValue,
}: InputFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Determine the actual input type based on password visibility
  const inputType = type === "password" && showPassword ? "text" : type;

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={inputType}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className="border border-black px-4.5 h-13 w-80.5 rounded-[20px] shadow-lg placeholder-gray-900 pr-12" // Added pr-12 for right padding to accommodate the eye icon
      />

      {/* Eye icon for password visibility toggle */}
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-4"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {/* Eye icon - you can replace this with an actual icon library or SVG */}
          <div className="w-5 h-5 flex items-center justify-center">
            {showPassword ? (
              // Icon for when password is visible (eye with slash)
              <svg className="w-5 h-5">
                <HiMiniEye size={20} />
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              // Icon for when password is hidden (eye)
              <svg className="w-5 h-5">
                <HiMiniEyeSlash size={20} />
              </svg>
            )}
          </div>
        </button>
      )}
    </div>
  );
}

export default InputFields;
