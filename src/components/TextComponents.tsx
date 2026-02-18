interface TextComponentsProps {
  text: string;
}

function TextComponents({ text }: TextComponentsProps) {
  return (
    <span
      className={`text-black hover:text-[#1E319D] hover:font-bold text-sm transition-colors duration-300`}
    >
      {text}
    </span>
  );
}

export default TextComponents;
