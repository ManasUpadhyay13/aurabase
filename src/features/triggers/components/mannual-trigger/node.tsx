import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointerIcon } from "lucide-react";
import { MannualTriggerDialog } from "./dialog";

export const MannualTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus = "initial";

  const handleOpenSettings = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <MannualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="When clicking 'Execute Workflow'"
        description="Runs the flow on clicking a button. Good for getting started quickly"
        status={nodeStatus}
        onSettings={() => {
          handleOpenSettings();
          return {};
        }}
        onDoubleClick={() => {
          handleOpenSettings();
          return {};
        }}
      />
    </>
  );
});
