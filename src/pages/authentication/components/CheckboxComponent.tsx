interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer
          w-5 h-5 
          border-2 border-gray-400 
          rounded 
          cursor-pointer 
          appearance-none
          bg-white
          checked:border-[#1E319D]
          checked:bg-white
          focus:outline-none
          focus:border-[#1E319D]
        "
        style={{
          backgroundImage: checked
            ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%231E319D' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E")`
            : "none",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />

      <label
        htmlFor={id}
        className="cursor-pointer select-none text-sm text-gray-800 peer-checked:underline"
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
