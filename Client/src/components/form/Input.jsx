const InputField = ({ label, type, name, value, onChange, required }) => {
  return (
    <div className=" my-2">
      <label className="flex flex-col opacity-60 mb-1"> {label}</label>
      <input
        className="rounded-md border h-10 border-fadeBlack border-opacity-30 w-full px-5"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;
