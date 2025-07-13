
'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { signUpAction } from '@/app/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="h-12 w-full sm:w-auto px-8 text-base"
      disabled={pending}
    >
      {pending ? 'Subscribing...' : 'Subscribe'}
    </Button>
  );
}

export function SignUpForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(signUpAction, { status: 'idle', message: '' });

  useEffect(() => {
    if (state.status === 'error') {
      toast({
        title: 'Subscription Failed',
        description: state.message,
        variant: 'destructive',
      });
    }
    // A redirect will be handled by the server action on success, so no need for a success toast.
  }, [state, toast]);

  return (
    <form
      action={formAction}
      className="mt-8 flex w-full flex-col items-center gap-4 sm:flex-row"
    >
      <div className="w-full">
        <Input
          className="h-12 text-base text-center sm:text-left bg-background focus:bg-white"
          placeholder="your.email@example.com"
          name="email"
          type="email"
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
}
