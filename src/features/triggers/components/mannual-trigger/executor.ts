import type { NodeExecutor } from "@/features/executions/types";

type MannualTriggerData = Record<string, unknown>;

export const mannualTriggerExecutor: NodeExecutor<MannualTriggerData> = async ({
  nodeId,
  context,
  step,
}) => {
  // TODO publish the loding state

  const result = await step.run("mannual-trigger", async () => context);

  // todo publish the success

  return result;
};
