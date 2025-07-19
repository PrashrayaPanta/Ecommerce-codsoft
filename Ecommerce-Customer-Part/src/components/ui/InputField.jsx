import React from "react";
// import { CiUser } from "react-icons/ci";

const InputField = ({ formik, type = "text", name, icon, label }) => {
  console.log(icon);

  console.log(formik);

  return (
    <>
      <div className="flex">
        <label htmlFor={name}>{label}</label>

        {
          (label = "checkbox" ? null : (
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-red-500"
              height="18"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 6v12"></path>
              <path d="M17.196 9 6.804 15"></path>
              <path d="m6.804 9 10.392 6"></path>
            </svg>
          ))
        }
      </div>

      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {/* {iconComponent} */}
          <i class={icon}></i>
        </div>
        <input
          type={type}
          name={name}
          id={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2 sm:text-sm border-gray-300 rounded-md"
          placeholder={name}
        />
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-red-400">{formik.errors[name]}</div>
      )}
    </>
  );
};

export default InputField;
