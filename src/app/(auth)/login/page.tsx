import { LoginForm } from "@/features/auth/components/login-form";
import { requrieUnAuth } from "@/lib/auth-utils";

const Page = async () => {
  // await requrieUnAuth();
  return <LoginForm />;
};

export default Page;
