"use client";

import { formatDistanceToNow } from "date-fns";
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import {
  useCreateWorkflow,
  useRemoveWorkflow,
  useSuspenceWorkflows,
} from "../hooks/use-workflow";
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import React from "react";
import { WorkflowIcon } from "lucide-react";

export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, setSearchValue } = useEntitySearch({
    params,
    setParams,
  });
  return (
    <EntitySearch
      value={searchValue}
      onChange={setSearchValue}
      placeholder="Search workflows"
    />
  );
};

export const WorkflowsList = () => {
  const workflows = useSuspenceWorkflows();

  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorklfowsItem data={workflow} />}
      emptyView={<WorkflowsEmpty />}
    />
  );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModel();
  const router = useRouter();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflow/${data?.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create or Manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};

export const WorkflowsPagination = () => {
  const worklfows = useSuspenceWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return (
    <EntityPagination
      disabled={worklfows.isPending}
      page={worklfows.data?.page}
      totalPages={worklfows.data?.totalPages || 0}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};

export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const WorkflowsLoading = () => {
  return <LoadingView message="Loading workflows..." />;
};

export const WorkflowsError = () => {
  return <ErrorView message="Failed to load workflows. Please try again." />;
};

export const WorkflowsEmpty = () => {
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModel();
  const router = useRouter();
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflow/${data?.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      {modal}
      <EmptyView message="No workflows found." onNew={handleCreate} />
    </>
  );
};

export const WorklfowsItem = ({ data }: { data: any }) => {
  const removeWorkflow = useRemoveWorkflow();

  const handleRemove = () => {
    removeWorkflow.mutate({ id: data.id });
  };

  return (
    <EntityItem
      href={`/workflow/${data.id}`}
      title={data.name}
      subTitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}
          &bull; Created{" "}
          {formatDistanceToNow(data.createdAt, { addSuffix: true })}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground" />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeWorkflow.isPending}
    />
  );
};
