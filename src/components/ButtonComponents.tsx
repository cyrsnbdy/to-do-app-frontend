interface ButtonProps {
  id?: string;
  label: string;
  name?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string; // optional extra styling
}

function Button({
  id,
  label,
  name,
  onClick,
  disabled,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      id={id}
      name={name}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#1E319D] text-white rounded-[20px] font-bold hover:bg-blue-700 transition-colors duration-300 ${className}`}
    >
      {label.toUpperCase()}
    </button>
  );
}

export default Button;
