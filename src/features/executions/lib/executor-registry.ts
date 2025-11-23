import { NodeType } from "@prisma/client";

export const executorRegistry: Record<NodeType, unknown> = {
  [NodeType.INITIAL]: () => {},
  [NodeType.MANNUAL_TRIGGER]: () => {},
  [NodeType.HTTP_REQUEST]: () => {},
};

export const getExecuter = (nodeType: NodeType): unknown => {
  const executer = executorRegistry[nodeType];
  if (!executer) {
    throw new Error(`No executor found for node type: ${nodeType}`);
  }
  return executer;
};
