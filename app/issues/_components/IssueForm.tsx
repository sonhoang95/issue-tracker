"use client";

import { ErrorMessage, LoadingSpinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Box, Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import Dropdown from "./Dropdown";

// lazy loading a component, this is necessary for client side components to not render first on the server
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type NewIssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NewIssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<NewIssueFormData> = async (data) => {
    console.log(data);
    try {
      setSubmitting(true);

      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);

      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-3">
            <TextField.Root>
              <TextField.Input
                defaultValue={issue?.title}
                placeholder="Title"
                {...register("title")}
              />
            </TextField.Root>
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller
              name="description"
              control={control}
              defaultValue={issue?.description}
              render={({ field }) => <SimpleMDE {...field} />}
            />
          </div>
          {issue && (
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Dropdown
                  setValue={setValue}
                  status={issue.status}
                  field={field}
                />
              )}
            />
          )}
        </div>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <LoadingSpinner />}
        </Button>
      </form>
    </div>
  );
};
export default IssueForm;
