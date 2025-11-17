"use client";

import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenceWorkflow } from "@/features/workflows/hooks/use-workflow";

export const EditorLoading = () => {
  return <LoadingView message="Loading editor..." />;
};

export const EditorError = () => {
  return <ErrorView message="Error loading editor" />;
};

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenceWorkflow(workflowId);

  return <div>{JSON.stringify(workflow, null, 2)}</div>;
};
