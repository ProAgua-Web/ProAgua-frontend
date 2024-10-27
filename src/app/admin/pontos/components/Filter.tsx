'use client';
export function Filter({
  value,
  setValue,
  children,
  checkbox_value,
}: {
  value: boolean;
  setValue: (v: boolean) => void;
  children: any;
  checkbox_value: string;
}) {
  return (
    <div className="flex flex-row items-center justify-center">
      <label
        htmlFor="bebedouro"
        onClick={(e) => {
          setValue(!value);
        }}
        className={`cursor-pointer ${value ? 'text-primary-500  hover:text-primary-800' : 'hover:text-primary-400'} `}
      >
        {children}
      </label>
      <input
        id="bebedouro"
        name="tipo"
        type="checkbox"
        value={checkbox_value}
        defaultChecked={value}
        hidden
      />
    </div>
  );
}
