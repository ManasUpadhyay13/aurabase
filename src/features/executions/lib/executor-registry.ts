import { NodeType } from "@prisma/client";
import { NodeExecutor } from "../types";
import { mannualTriggerExecutor } from "@/features/triggers/components/mannual-trigger/executor";
import { httpRequestExecutor } from "../components/http-request/executor";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executorRegistry: Record<NodeType, NodeExecutor<any>> = {
  [NodeType.MANNUAL_TRIGGER]: mannualTriggerExecutor,
  [NodeType.INITIAL]: mannualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getExecuter = (nodeType: NodeType): NodeExecutor<any> => {
  const executer = executorRegistry[nodeType];

  if (!executer) {
    throw new Error(`No executor found for node type: ${nodeType}`);
  }
  return executer;
};
