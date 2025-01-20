"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema, signUpSchema } from "@/lib/validation";

const Page = () => (
  <AuthForm
    type="SIGN-UP"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
      fullname: "",
      universityId: 0,
      universityCard: "",
    }}
    onSubmit={() => {}}
  />
);

export default Page;
