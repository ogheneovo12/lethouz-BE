import * as Yup from "yup";

const requiredString = Yup.string().required("(required)");

const email = Yup.string()
  .email("(Invalid email address)")
  .required("(Required)");

export const password = Yup.string()
  .min(8, "(Must be more than 8 characters)")
  .matches(
    /^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u,
    "(one uppercase, one lowercase, and one digit)"
  )
  .required("(required)");

export const confirmPassword = Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("Password confirm is required");

export const regSchema = Yup.object().shape({
  firstName: requiredString,
  lastName: requiredString,
  password,
  email,
  confirmPassword,
  tandc: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().required(),
  password,
});
