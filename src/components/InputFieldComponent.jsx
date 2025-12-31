import { motion } from "motion/react";

function InputField({ type = "text", placeholder, value, onChange, step }) {
  return (
    <motion.input
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.01, boxShadow: "0px 4px 12px rgba(0,0,0,0.12)" }}
      whileTap={{ scale: 0.97 }}
      whileFocus={{ boxShadow: "0px 0px 15px 3px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      
      className="
      w-full
      flex 
      justify-center 
      py-2 px-4 
      border-1 rounded-full
      outline-none
      placeholder:text-black/40
      bg-white
      hover:border-white
      hover:text-white
      focus:border-white
      focus:text-white
      focus:bg-[#f2552e]/90
      transition-colors duration-200 ease-in-out
      [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
      "
      type={type}
      placeholder={placeholder}
      value={value}
      step={step}
      onChange={onChange}
    />
  );
}

export default InputField;
