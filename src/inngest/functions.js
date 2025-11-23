import { NonRetriableError } from "inngest";
import { inngest } from "./client";
import { topologicalSort } from "./utils";
import { NodeType } from "@prisma/client";
import { getExecuter } from "@/features/executions/lib/executor-registry";

export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow" },
  { event: "workflow/execute.workflow" },
  async ({ event, step }) => {
    const workflowId = event.data.workflowId;

    if (!workflowId) {
      throw new NonRetriableError("Workflow Id is missing");
    }

    const sortedNodes = await step.run("prepare-workflow", async () => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
          id: workflowId,
        },
        include: {
          nodes: true,
          connections: true,
        },
      });

      return topologicalSort(workflow.nodes, workflow.connections);
    });

    // intial the context with any intital data

    let context = event.data.initalData || {};

    // execute each node

    for (const node of sortedNodes) {
      const executer = getExecuter(node.type);
      context = await executer({
        data : node.data as Record<string, unknown>,
        nodeId : node.id
      })
    }

    return { sortedNodes };
  }
);
