"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { signUpAction } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="h-12 w-full sm:w-auto px-8 text-base"
      disabled={pending}
    >
      {pending ? "Subscribing..." : "Count Me In!"}
    </Button>
  );
}

export function SignUpForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(signUpAction, {
    status: "idle",
    message: "",
  });

  useEffect(() => {
    if (state.status === "error") {
      toast({
        title: "Subscription Failed",
        description: state.message,
        variant: "destructive",
      });
    }
    // A redirect will be handled by the server action on success, so no need for a success toast.
  }, [state, toast]);

  return (
    <form
      action={formAction}
      className="mt-8 flex w-full flex-col items-center gap-6"
    >
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2 flex flex-col items-start">
          <Label className="" htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="h-12 text-base bg-background focus:bg-white"
          />
        </div>

        <div className="space-y-2 flex flex-col items-start">
          <Label htmlFor="birthday">
            Birthday (So we know when to spoil you just a little.)
          </Label>
          <Input
            id="birthday"
            name="birthday"
            type="text"
            placeholder="MM/DD"
            pattern="^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])$"
            required
            className="h-12 text-base bg-background focus:bg-white"
          />
        </div>

        <div className="space-y-2 flex flex-col items-start">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="h-12 text-base bg-background focus:bg-white"
          />
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}
