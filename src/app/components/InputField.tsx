interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  required = false 
}) => (
  <div>
    <label 
      htmlFor={label} 
      className="block text-sm font-medium"
    >
      {label}:
    </label>
    <input
      id={label}
      type="text"
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 border rounded"
    />
  </div>
);

export default InputField;
