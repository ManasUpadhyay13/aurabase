import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const requrieAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session;
};

export const requrieUnAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }
};
