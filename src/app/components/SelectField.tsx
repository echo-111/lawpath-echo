interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  options, 
  required = false 
}) => (
  <div>
    <label 
      htmlFor={label} 
      className="block text-sm font-medium"
    >
      {label}:
    </label>
    <select 
      id={label}
      value={value} 
      onChange={onChange} 
      required={required} 
      className="w-full p-2 border rounded"
      >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
