import { UpgradeModel } from "@/components/upgrade-model";
import { TRPCClientError } from "@trpc/client";
import { useState } from "react";

export const useUpgradeModel = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleError = (error: unknown) => {
    if (error instanceof TRPCClientError) {
      if (error?.data?.code === "FORBIDDEN") {
        setOpen(true);
        return true;
      }
    }
    return false;
  };

  const modal = <UpgradeModel open={open} onOpenChange={handleOpenChange} />;

  return {
    modal,
    handleError,
  };
};
