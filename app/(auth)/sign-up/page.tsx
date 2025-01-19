"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validation";

const Page = () => (
  <AuthForm
    type="SIGN-UP"
    schema={signInSchema}
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
