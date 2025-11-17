"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  useSuspenceWorkflow,
  useUpdateWorkflowName,
} from "@/features/workflows/hooks/use-workflow";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const EditorSaveButton = ({ workflowId }: { workflowId: string }) => {
  return (
    <div className="ml-auto">
      <Button size="sm" onClick={() => {}}>
        <SaveIcon className="size-4" />
        Save
      </Button>
    </div>
  );
};

export const EditorNameInput = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenceWorkflow(workflowId);
  const updateWorkfow = useUpdateWorkflowName();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(workflow?.name);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (workflow.name) {
      setName(workflow.name);
    }
  }, [workflow.name]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (name === workflow?.name) {
      setIsEditing(false);
      return;
    }

    try {
      await updateWorkfow.mutateAsync({
        id: workflowId,
        name,
      });
    } catch (error) {
      setName(workflow?.name);
    } finally {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSave();
    } else if (event.key === "Escape") {
      setName(workflow?.name);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        disabled={updateWorkfow.isPending}
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        className="h-7 w-auto min-w-[300px] px-2"
      />
    );
  }

  return (
    <BreadcrumbItem
      className="cursor-pointer hover:text-foreground transition-colors duration-100"
      onClick={() => setIsEditing(true)}
    >
      {workflow?.name}
    </BreadcrumbItem>
  );
};

export const EditorBreadcrumbs = ({ workflowId }: { workflowId: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link prefetch href="/workflows">
              Workflows
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <EditorNameInput workflowId={workflowId} />
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const EditorHeader = ({ workflowId }: { workflowId: string }) => {
  return (
    <header className="flex h-14 shrink-10 items-center gap-2 border-b px-4 bg-background">
      <SidebarTrigger />
      <div className="flex flex-row items-center justify-baseline gap-x-4 w-full">
        <EditorBreadcrumbs workflowId={workflowId} />
        <EditorSaveButton workflowId={workflowId} />
      </div>
    </header>
  );
};
