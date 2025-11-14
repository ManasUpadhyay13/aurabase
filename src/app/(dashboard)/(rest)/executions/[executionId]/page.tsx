import { requrieAuth } from "@/lib/auth-utils";

interface PageProps {
  params: Promise<{
    executionId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  await requrieAuth();
  const { executionId } = await params;

  return <div>Execution id: {executionId}</div>;
};

export default Page;
