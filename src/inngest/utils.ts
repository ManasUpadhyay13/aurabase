import { Connection, Node } from "@prisma/client";
import toposort from "toposort";

export const topologicalSort = (
  nodes: Node[],
  connections: Connection[]
): Node[] => {
  // if no connection , return node as-it-is (they are all independent)

  if (connections.length === 0) {
    return nodes;
  }

  // create the edges for the toposort

  const edges: [string, string][] = connections.map((connection) => [
    connection.fromNodeId,
    connection.toNodeId,
  ]);

  // add noes wiith no connections

  const connectedNodeIds = new Set<string>();
  for (const connection of connections) {
    connectedNodeIds.add(connection.fromNodeId);
    connectedNodeIds.add(connection.toNodeId);
  }

  for (const node of nodes) {
    if (!connectedNodeIds.has(node.id)) {
      edges.push([node.id, node.id]);
    }
  }

  // perform the sort

  let sortedNodeIds: string[];

  try {
    sortedNodeIds = toposort(edges);
    // remove duplicates form self edges
    sortedNodeIds = [...new Set(sortedNodeIds)];
  } catch (error) {
    if (error instanceof Error && error.message.includes("Cyclic")) {
      throw new Error("Cycle detected in workflow");
    }
    throw error;
  }

  // map sorted its back to node objects

  const nodeMaps = new Map(nodes.map((node) => [node.id, node]));

  return sortedNodeIds.map((id) => nodeMaps.get(id)!).filter(Boolean);
};
