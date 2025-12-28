import { motion } from "motion/react";

function InputField({ type = "text", placeholder, value, onChange, step }) {
  return (
    <motion.input
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.01, boxShadow: "0px 4px 12px rgba(0,0,0,0.12)" }}
      whileTap={{ scale: 0.97 }}
      whileFocus={{ boxShadow: "0px 0px 0px 3px rgba(99,102,241,0.4)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      
      className="
      w-full
      flex 
      justify-center 
      py-2 px-4 
      border-1 rounded-full
      outline-none
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
