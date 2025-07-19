// import { Button } from "./button";

export const SubmitBtn = ({
  formik,
  label,
  icon = "fa-arrow-right-to-bracket",
}) => {
  return (
    <button className="bg-black px-2 py-1 text-white rounded-md" disabled={formik.isSubmitting} type="submit">
       <i
        className={`fa-solid ${
          formik.isSubmitting ? "fa-refresh fa-spin" : icon
        } me-2`}
      ></i>         

      {label}
    </button>
  );
};
