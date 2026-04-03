import { useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/shared/presentation/atoms/Button";
import { ErrorInline } from "@/shared/presentation/atoms/ErrorInline";
import { Input } from "@/shared/presentation/atoms/Input";

import { useDcContext } from "../../model";

export default function Password() {
  const { form } = useDcContext();
  const [show, setShow] = useState(false);

  return (
    <section className="flex flex-col gap-1.5">
      <label htmlFor="password" className="text-sm font-medium">
        New Password
      </label>
      <div className="relative">
        <Input
          id="password"
          type={show ? "text" : "password"}
          placeholder="Enter new password"
          className="pr-10"
          {...form.register("password")}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
          onClick={() => setShow((v) => !v)}
          tabIndex={-1}
        >
          {show ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">Leave blank to keep your current password.</p>
      <ErrorInline message={form.formState.errors.password?.message} />
    </section>
  );
}
