"use client";

import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { loginUser } from "@/services/authService";
import { Button, Input } from "@heroui/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const Login = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues: LoginFormType = {
    email: "",
    password: "",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      try {
        setSubmitting(true);

        const response = await loginUser(values);
        if (response) {
          router.replace("/");
        }
      } catch (error: any) {
      } finally {
        setSubmitting(false);
      }
    },
    [router]
  );

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6">Login</div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
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
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              isLoading={isSubmitting}
              color="primary"
            >
              Login
            </Button>
          </>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm">
        Don&apos;t have an account ?{" "}
        <Link href="/register" className="font-bold">
          Register here
        </Link>
      </div>
    </>
  );
};
