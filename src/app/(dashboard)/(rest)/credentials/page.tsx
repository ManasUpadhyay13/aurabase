import { requrieAuth } from "@/lib/auth-utils";
import React from "react";

const Page = async () => {
  await requrieAuth();
  return (
    <div>
      <h1>credentials</h1>
    </div>
  );
};

export default Page;
