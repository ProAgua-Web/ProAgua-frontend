import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
}

export default function Button(props: ButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className="w-full min-h-10 border p-3 rounded-md bg-primary-500 hover:bg-primary-600 text-white"
        >
            {props.label}
        </button>
    )
}

