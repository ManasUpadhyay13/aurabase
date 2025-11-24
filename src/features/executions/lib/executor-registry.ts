import { NodeType } from "@prisma/client";
import { NodeExecutor } from "../types";
import { mannualTriggerExecutor } from "@/features/triggers/components/mannual-trigger/executor";
import { httpRequestExecutor } from "../components/http-request/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.MANNUAL_TRIGGER]: mannualTriggerExecutor,
  [NodeType.INITIAL]: mannualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
};

export const getExecuter = (nodeType: NodeType): NodeExecutor => {
  const executer = executorRegistry[nodeType];

  if (!executer) {
    throw new Error(`No executor found for node type: ${nodeType}`);
  }
  return executer;
};
