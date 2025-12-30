import { motion } from "motion/react";

function Button({ label, onClick, icon, type = "button" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.9, y: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      type={type}
      onClick={onClick}
      className="flex justify-center items-center gap-1 py-2 px-4 rounded-full border"
    >
      {icon}
      {label}
    </motion.button>
  );
}

export default Button;
