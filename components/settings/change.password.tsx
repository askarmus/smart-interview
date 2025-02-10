"use client";
import React, { useState } from "react";
import { Button, CardFooter, Input, Card, CardBody } from "@heroui/react";
import { Formik, Form } from "formik";
import { showToast } from "@/app/utils/toastUtils";
import { ToastContainer } from "react-toastify";
import { ChangePasswordSchema } from "@/helpers/schemas";
import { ChangePasswordFormType } from "@/helpers/types";
import { changePassword } from "@/services/authService";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: ChangePasswordFormType = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: ChangePasswordFormType) => {
    try {
      setIsLoading(true);
      await changePassword(values); // Call to change password API
      showToast.success("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password: ", error);
      showToast.error("Failed to update password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={ChangePasswordSchema} onSubmit={handleSubmit}>
      {({ values, errors, touched, handleChange }) => (
        <Form>
          <Card className='p-5'>
            <CardBody>
              <h1 className='text-xl font-semibold mb-4'>Change Password</h1>
              <div className='grid grid-cols-1 gap-4'>
                <Input label='Current Password' name='currentPassword' type='password' value={values.currentPassword} onChange={handleChange} isInvalid={!!errors.currentPassword && !!touched.currentPassword} errorMessage={errors.currentPassword} />
                <Input label='New Password' name='newPassword' type='password' value={values.newPassword} onChange={handleChange} isInvalid={!!errors.newPassword && !!touched.newPassword} errorMessage={errors.newPassword} />
                <Input label='Confirm New Password' name='confirmPassword' type='password' value={values.confirmPassword} onChange={handleChange} isInvalid={!!errors.confirmPassword && !!touched.confirmPassword} errorMessage={errors.confirmPassword} />
              </div>
              <ToastContainer />
            </CardBody>
            <CardFooter>
              <Button type='submit' isLoading={isLoading} color='primary'>
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassword;
