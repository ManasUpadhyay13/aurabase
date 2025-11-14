import { requrieAuth } from "@/lib/auth-utils";


const Page = async() => {
  await requrieAuth()
  return (
    <div>
      <h1>Workflows</h1>
    </div>
  );
};

export default Page;
