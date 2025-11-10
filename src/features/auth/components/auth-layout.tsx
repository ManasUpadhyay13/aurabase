import Image from "next/image";
import Link from "next/link";
import { APP_LOGO_URL, APP_NAME } from "../../../../utils/constant";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image
            src={APP_LOGO_URL}
            alt={APP_NAME}
            className="flex items-center gap-2 self-center font-medium"
            width={20}
            height={20}
          />
          {APP_NAME}
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
