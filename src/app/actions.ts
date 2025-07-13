
'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const audienceId = process.env.RESEND_AUDIENCE_ID;

const formSchema = z.object({
  email: z.string().email({
    message: 'Please provide a valid email address to subscribe.',
  }),
});

type State = {
  status: 'success' | 'error';
  message: string;
} | {
  status: 'idle';
  message: '';
};

export async function signUpAction(prevState: State, data: FormData): Promise<State> {
  const email = data.get('email');
  const validatedFields = formSchema.safeParse({ email });

  if (!validatedFields.success) {
    return {
      status: 'error',
      message: validatedFields.error.flatten().fieldErrors.email?.[0] || 'Invalid input.'
    };
  }

  if (!audienceId) {
    console.error('RESEND_AUDIENCE_ID is not configured in .env file.');
    return {
      status: 'error',
      message: 'Email service is not configured. Please contact support.',
    }
  }

  try {
    await resend.contacts.create({
      email: validatedFields.data.email,
      audienceId: audienceId,
    });
  } catch (error) {
    console.error('Resend API error:', error);
    // You might want to check for specific error types, e.g., if the email
    // is already subscribed, you could still treat it as a success.
    // For now, any error will be reported to the user.
    return {
      status: 'error',
      message: 'Could not subscribe. Please try again later.'
    }
  }

  // On successful "submission", redirect to the thank you page.
  redirect('/thank-you');
}
