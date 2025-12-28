function Button({ label, onClick, icon, type = "button" }) {
  return (
    <button type={type} onClick={onClick}>
      {icon}
      {label}
    </button>
  );
}

export default Button;
