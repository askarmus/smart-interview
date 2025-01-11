import { array, object, ref, string } from "yup";

export const LoginSchema = object().shape({
  email: string()
    .email("This field must be an email")
    .required("Email is required"),
  password: string().required("Password is required"),
});

export const RegisterSchema = object().shape({
  name: string().required("Name is required"),
  email: string()
    .email("This field must be an email")
    .required("Email is required"),
  password: string().required("Password is required"),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password")], "Passwords must match"),
});

export const AddJobSchema = object().shape({
  title: string().required("Title is required"),
  description: string().required("Description is required"),
  aiLevel: string().required("Please select a level"),

  questions: array()
    .of(
      object().shape({
        text: string().required("Question is required"),
      })
    )
    .min(1, "At least one question is required"),
});

export const SendInvitationSchema = object().shape({
  name: string().required("Name is required"),
  email: string().email("Invalid email address").required("Email is required"),
  expires: string().required("Expiration date is required"),
});

export const AddInterviewerSchema = object().shape({
  name: string().required("Name is required"),
  jobTitle: string().required("Job Title is required"),
  biography: string().required("Biography is required"),
  photoUrl: string().url("Invalid URL").required("Photo URL is required"),
});

export const CompanySettingsSchema = object().shape({
  name: string().required("Name is required"),
  address: string().nullable(),
  website: string().url("Invalid website URL").nullable(),
  linkedin: string().url("Invalid LinkedIn URL").nullable(),
  facebook: string().url("Invalid Facebook URL").nullable(),
  twitter: string().url("Invalid Twitter URL").nullable(),
  logo: string().url("Invalid logo URL").nullable(),
  phone: string().nullable(),
});
