
'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please provide a valid email address to subscribe.',
  }),
});

export async function signUpAction(data: z.infer<typeof formSchema>) {
  const validatedFields = formSchema.safeParse(data);

  if (!validatedFields.success) {
    throw new Error(
      validatedFields.error.flatten().fieldErrors.email?.[0] || 'Invalid input.'
    );
  }

  // Here you would integrate with your email marketing service like Resend.
  // For this demo, we'll just log the email to the console.
  console.log(`New subscriber signed up: ${validatedFields.data.email}`);

  // On successful "submission", redirect to the thank you page.
  redirect('/thank-you');
}
