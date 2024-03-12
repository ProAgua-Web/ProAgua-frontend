import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className="min-h-10 w-full rounded-md border bg-primary-500 p-3 text-white hover:bg-primary-600"
    >
      {props.label}
    </button>
  );
}
