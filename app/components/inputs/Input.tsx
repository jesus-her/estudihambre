"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { Input as InputUi } from "@nextui-org/react";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  pattern?: string;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
  pattern,
  maxLength,
}) => {
  return (
    <div className="w-full relative">
      <InputUi
        startContent={formatPrice && <BiDollar size={24} />}
        isRequired={required}
        variant="bordered"
        isClearable
        label={label}
        isInvalid={errors[id] ? true : false}
        id={id}
        maxLength={maxLength}
        max={maxLength}
        pattern={pattern}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        inputMode={type === "number" ? "numeric" : "text"} // Agrega esta línea
        // className={`
        //   peer
        //   w-full
        //   p-4
        //   pt-6
        //   font-light

        //   border-2
        //   rounded-md
        //   outline-none
        //   transition
        //   disabled:opacity-70
        //   disabled:cursor-not-allowed
        //   ${formatPrice ? "pl-9" : "pl-4"}
        //   ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        //   ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        // `}
      />
      {/* <label
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label> */}
    </div>
  );
};

export default Input;
