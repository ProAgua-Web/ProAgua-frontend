import React, { useState } from 'react';

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

// TODO: EXCLUDE THIS PAGE

export default function Input(props: InputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };
  return (
    <div className="flex w-full flex-col gap-1">
      <label className="w-full" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        className="h-14 w-full rounded-md border border-neutral-200 p-2 focus:outline-primary-300 active:outline-primary-300"
        type={props.type}
        name={props.name}
        value={inputValue}
        onChange={handleInputChange}
        required={props.required}
      />
    </div>
  );
}
