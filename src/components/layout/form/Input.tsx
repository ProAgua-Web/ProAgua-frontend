import React from 'react';

interface InputProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
    return (
        <div className="w-full flex flex-col gap-1">
            <label className="w-full" htmlFor={props.name}>{props.label}</label>
            <input
                className='w-full border border-neutral-200 rounded-md p-2'
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}
