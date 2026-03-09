import { ErrorInline } from "@/shared/presentation/atoms/ErrorInline";
import { Input } from "@/shared/presentation/atoms/Input";

import { useDcContext } from "../../model";

export interface PasswordProps {
  value?: string;
}

export default function Password(props: PasswordProps) {
  const { form } = useDcContext();

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Password</p>
      <Input placeholder="Password" {...form.register("password")} defaultValue={props.value} />

      <ErrorInline message={form.formState.errors.password?.message} />
    </section>
  );
}
