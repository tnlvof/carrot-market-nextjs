import { InputHTMLAttributes } from "react";

interface FormInputProps {
  errors?: string[];
  name?: string;
}

export default function Input({
  errors = [],
  name,
  ...props
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 pl-2"
        {...props}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 text-sm font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
