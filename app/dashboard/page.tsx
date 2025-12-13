import { deleteProjectById, duplicateProjectById, editProjectById, getAllPlaygroundForUser } from "@/modules/dashboard/actions";
import AddNewButton from "@/modules/dashboard/components/add-new";
import AddRepo from "@/modules/dashboard/components/add-repo";
import EmptyState from "@/modules/dashboard/components/empty-state";
import ProjectTable from "@/modules/dashboard/components/project-table";
import React from "react";

const Page = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-32 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl dark:bg-blue-500/10" />
        <div className="absolute top-40 -right-40 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl dark:bg-purple-500/10" />
      </div>

      <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-12">
        <div className="w-full mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">
            Your Playgrounds
          </h1>
          <p className="text-lg text-muted-foreground">
            Create and manage your coding projects with ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
          <AddNewButton />
          <AddRepo />
        </div>

        <div className="w-full">
          {playgrounds && playgrounds.length === 0 ? (
            <EmptyState />
          ) : (
            <ProjectTable
              projects={playgrounds || []}
              onDeleteProject={deleteProjectById}
              onUpdateProject={editProjectById}
              onDuplicateProject={duplicateProjectById}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
