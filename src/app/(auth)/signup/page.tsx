import { RegisterForm } from "@/features/auth/components/register-form";
import { requrieUnAuth } from "@/lib/auth-utils";

const Page = async () => {
  await requrieUnAuth();
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Page;
