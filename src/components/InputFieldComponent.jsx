function InputField({
  type = "text",
  placeholder,
  value,
  onChange,
  step
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      step={step}
      onChange={onChange}
    />
  );
}

export default InputField;
