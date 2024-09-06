import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import { useForm, router } from "@inertiajs/react";

interface NewProjectFormProps {
  onClose: () => void;
}

export const NewProjectForm: React.FC<NewProjectFormProps> = ({ onClose }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    description: "",
    state: false,
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
          onClose();
        },
      },
    );
  };

  return (
    <form onSubmit={submit} className="p-6">
      <div className="mb-4">
        <InputLabel htmlFor="title" value="Title" />
        <TextInput
          id="title"
          type="text"
          className="mt-1 block w-full"
          value={data.title}
          onChange={e => setData("title", e.target.value)}
          required
        />
        <InputError message={errors.title} className="mt-2" />
      </div>

      <div className="mb-4">
        <InputLabel htmlFor="description" value="Description" />
        <textarea
          id="description"
          className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          value={data.description}
          onChange={e => setData("description", e.target.value)}
        />
        <InputError message={errors.description} className="mt-2" />
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <Checkbox
            name="state"
            checked={data.state}
            onChange={e => setData("state", e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Active
          </span>
        </label>
        <InputError message={errors.state} className="mt-2" />
      </div>

      <div className="flex items-center justify-end mt-4">
        <PrimaryButton className="ml-4" disabled={processing}>
          Create Project
        </PrimaryButton>
      </div>
    </form>
  );
};
