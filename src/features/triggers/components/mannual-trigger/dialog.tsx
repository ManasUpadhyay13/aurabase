"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MannualTriggerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MannualTriggerDialog = ({
  open,
  onOpenChange,
}: MannualTriggerDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manual Trigger</DialogTitle>
          <DialogDescription>
            Used to manually execute a workflow no configuration available.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">Mannual Trigger</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
