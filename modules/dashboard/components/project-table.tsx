"use client";

import Image from "next/image";
import { format, parseISO } from "date-fns";
import type { Project } from "../types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import {
  MoreHorizontal,
  Edit3,
  Trash2,
  ExternalLink,
  Copy,
  Download,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { MarkedToggleButton } from "./marked-toggle";

interface ProjectTableProps {
  projects: Project[];
  onUpdateProject?: (
    id: string,
    data: { title: string; description: string }
  ) => Promise<void>;
  onDeleteProject?: (id: string) => Promise<void>;
  onDuplicateProject?: (id: string) => Promise<void>;
  
}

interface EditProjectData {
  title: string;
  description: string;
}

export default function ProjectTable({
  projects,
  onUpdateProject,
  onDeleteProject,
  onDuplicateProject,

}: ProjectTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editData, setEditData] = useState<EditProjectData>({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
 

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setEditData({
      title: project.title,
      description: project.description || "",
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (project: Project) => {
    setSelectedProject(project);

    setDeleteDialogOpen(true);
  };

  const handleUpdateProject = async () => {
    if (!selectedProject || !onUpdateProject) return;

    setIsLoading(true);

    try {
      await onUpdateProject(selectedProject.id, editData);
      setEditDialogOpen(false);
      toast.success("Project updated successfully");
    } catch (error) {
      toast.error("Failed to update project");
      console.error("Error updating project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkasFavorite = async (project: Project) => {
    //    Write your logic here
  };

  const handleDeleteProject = async () => {
    if (!selectedProject || !onDeleteProject) return;

    setIsLoading(true);
    try {
      await onDeleteProject(selectedProject.id);
      setDeleteDialogOpen(false);
      setSelectedProject(null);
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
      console.error("Error deleting project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDuplicateProject = async (project: Project) => {
    if (!onDuplicateProject) return;

    setIsLoading(true);
    try {
      await onDuplicateProject(project.id);
      toast.success("Project duplicated successfully");
    } catch (error) {
      toast.error("Failed to duplicate project");
      console.error("Error duplicating project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyProjectUrl = (projectId: string) => {
    const url = `${window.location.origin}/playground/${projectId}`;
    navigator.clipboard.writeText(url);
    toast.success("Project url copied to clipboard");
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-xl border border-border/50 bg-white/50 dark:bg-white/5 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-smooth overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
            
            <div className="relative p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/playground/${project.id}`}
                    className="group/link"
                  >
                    <h3 className="text-xl font-bold text-foreground group-hover/link:text-primary transition-colors truncate">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {project.description || "No description"}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <MarkedToggleButton markedForRevision={project.Starmark[0]?.isMarked} id={project.id} />
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/playground/${project.id}`}
                        className="flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Open Project
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/playground/${project.id}`}
                        target="_blank"
                        className="flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in New Tab
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleEditClick(project)}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDuplicateProject(project)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => copyProjectUrl(project.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Copy URL
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeleteClick(project)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-0"
                >
                  {project.template}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(project.createdAt), "MMM dd, yyyy")}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-border/30">
                <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <Image
                    src={project.user.image || "/placeholder.svg"}
                    alt={project.user.name || "User"}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {project.user.name || "Anonymous"}
                </span>
              </div>

              <Link
                href={`/playground/${project.id}`}
                className="mt-4 w-full inline-block"
              >
                <Button 
                  variant="outline" 
                  className="w-full group/btn border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-smooth"
                >
                  Open Project
                  <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project details here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={editData.title}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter project title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editData.description}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter project description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleUpdateProject}
              disabled={isLoading || !editData.title.trim()}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedProject?.title}"? This
              action cannot be undone. All files and data associated with this
              project will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Deleting..." : "Delete Project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
