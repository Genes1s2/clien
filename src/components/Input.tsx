// /** @format */

import React from "react";
import { Field, ErrorMessage } from "formik";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  isRequired?: boolean;
  errorMessage?: string | boolean;
}

const Input: React.FC<InputProps> = ({ label, name, type = "text", isRequired = false, errorMessage }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-semibold text-blue-600">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>

      <Field
        id={name}
        name={name}
        type={type}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {errorMessage && <small className="text-red-600">{errorMessage}</small>}
    </div>
  );
};

export default Input;

