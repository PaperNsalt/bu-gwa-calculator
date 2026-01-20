import { motion } from "motion/react";

function InputField({ type = "text", placeholder, value, onChange, step, className = "" }) {
  return (
    <motion.input
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.01, boxShadow: "0px 4px 12px rgba(0,0,0,0.12)" }}
      whileTap={{ scale: 0.97 }}
      whileFocus={{ boxShadow: "0px 0px 15px 3px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
      w-full
      flex 
      justify-center 
      py-2 px-4
      border
      border-gray-200
      rounded-full
      outline-none
      placeholder:text-gray-400
      text-gray-700
      bg-white/90
      hover:border-white
      focus:border-white
      focus:text-white
      focus:bg-[#f2552e]/90
      focus:placeholder:text-white/70
      transition-all duration-200 ease-in-out
      [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
      ${className}
      `}
      type={type}
      placeholder={placeholder}
      value={value}
      step={step}
      onChange={onChange}
    />
  );
}

export default InputField;