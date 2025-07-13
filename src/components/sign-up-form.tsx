
'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { signUpAction } from '@/app/actions';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

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
    <Form {...form}>
      <form
        action={formAction}
        className="mt-8 flex w-full flex-col items-center gap-4 sm:flex-row"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="h-12 text-base text-center sm:text-left bg-background focus:bg-white"
                  placeholder="your.email@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}
