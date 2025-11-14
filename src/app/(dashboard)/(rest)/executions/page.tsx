import { requrieAuth } from "@/lib/auth-utils";
import React from "react";

const Page = async () => {
  await requrieAuth();
  return (
    <div>
      <h1>Credentials</h1>
    </div>
  );
};

export default Page;
