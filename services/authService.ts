import apiClient from "@/helpers/apiClient";
import { ResetPasswordFormType, ChangePasswordFormType, ForgetPasswordFormType, LoginFormType, RegisterFormType } from "@/helpers/types";
import axios, { AxiosError } from "axios";

export const registerUser = async (values: RegisterFormType) => {
  const response = await apiClient.post("/auth/register", values);
  return response.data;
};

export const forgetPassword = async (values: ForgetPasswordFormType) => {
  const response = await apiClient.post("/auth/forgotPassword", values);
  return response.data;
};

export const changePassword = async (values: ChangePasswordFormType) => {
  const response = await apiClient.post("/auth/changePassword", values);
  return response.data;
};

export const resetPassword = async (values: ResetPasswordFormType) => {
  const response = await apiClient.post("/auth/resetPassword", values);
  return response.data;
};
export const loginUser = async (values: LoginFormType) => {
  const response = await apiClient.post("/auth/login", values, {
    withCredentials: true, // ✅ Ensures cookies are included
  });

  return response.data;
};

export const getUser = async () => {
  try {
    const { data } = await axios.get("/api/auth/me", {
      withCredentials: true, // ✅ This tells Axios to include cookies!
    });

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
};
