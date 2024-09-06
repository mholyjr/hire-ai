import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/Components/ui/dialog";
import { PlusIcon } from "lucide-react";
import React from "react";
import { NewProjectForm } from "./parts/NewProjectForm";
import { useForm, router } from "@inertiajs/react";

export const NewProjectDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const { data, setData, processing, errors, reset } = useForm({
    title: "",
    description: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post(
      route("projects.store"),
      {
        ...data,
        preserveState: true,
        preserveScroll: true,
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      },
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8" onClick={() => setOpen(true)}>
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">New Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={submit} className="p-6">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Fill out the form to create a new project.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-8">
            <NewProjectForm data={data} setData={setData} errors={errors} />
          </div>
          <DialogFooter>
            <div>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
            <Button disabled={processing}>Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
