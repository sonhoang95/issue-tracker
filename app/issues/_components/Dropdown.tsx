"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { ControllerRenderProps, UseFormSetValue } from "react-hook-form";

type Field = ControllerRenderProps<
  {
    title: string;
    description: string;
    status?: "OPEN" | "IN_PROGRESS" | "CLOSED" | undefined;
  },
  "status"
>;

type SetValue = UseFormSetValue<{
  title: string;
  description: string;
  status?: "OPEN" | "IN_PROGRESS" | "CLOSED" | undefined;
}>;

interface Props {
  field: Field;
  setValue: SetValue;
  status: Status;
}

const Dropdown = ({ setValue, field, status }: Props) => {
  return (
    <Select.Root
      defaultValue={status}
      onValueChange={(value: Status) => setValue("status", value)}
      {...field}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          <Select.Item value="OPEN">Open</Select.Item>
          <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
          <Select.Item value="CLOSED">Closed</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
export default Dropdown;
