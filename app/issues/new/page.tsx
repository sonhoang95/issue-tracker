"use client";

import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

interface NewIssueForm {
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const [error, setError] = useState("");
  const { register, control, handleSubmit } = useForm<NewIssueForm>();

  const router = useRouter();

  const onSubmit: SubmitHandler<NewIssueForm> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/");
    } catch (error) {
      setError("An unexpected error ocurred.");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE {...field} />}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};
export default NewIssuePage;
