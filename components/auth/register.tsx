"use client";

import { createAuthCookie } from "@/actions/auth.action";
import { showToast } from "@/app/utils/toastUtils";
import { handleError } from "@/helpers/errorHandler";
import { RegisterSchema } from "@/helpers/schemas";
import { RegisterFormType } from "@/helpers/types";
import { registerUser } from "@/services/authService";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export const Register = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues: RegisterFormType = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleRegister = useCallback(
    async (values: RegisterFormType) => {
      try {
        setSubmitting(true);

        await registerUser(values);

        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.replace("/login");
        }, 2000);
      } catch (error: any) {
      } finally {
        setSubmitting(false);
      }
    },
    [router]
  );

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6">Register</div>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
              <Input
                variant="bordered"
                label="Name"
                value={values.name}
                isInvalid={!!errors.name && !!touched.name}
                errorMessage={errors.name}
                onChange={handleChange("name")}
              />
              <Input
                variant="bordered"
                label="Email"
                type="email"
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
              <Input
                variant="bordered"
                label="Password"
                type="password"
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
              <Input
                variant="bordered"
                label="Confirm password"
                type="password"
                value={values.confirmPassword}
                isInvalid={
                  !!errors.confirmPassword && !!touched.confirmPassword
                }
                errorMessage={errors.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm">
        Already have an account ?{" "}
        <Link href="/login" className="font-bold">
          Login here
        </Link>
      </div>
    </>
  );
};
