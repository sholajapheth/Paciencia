
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
    const errorMessage = 'RESEND_AUDIENCE_ID is not configured in .env file.';
    console.error(errorMessage);
    return {
      status: 'error',
      message: 'Email service is not configured. Please contact support.',
    }
  }
  
  if (!process.env.RESEND_API_KEY) {
    const errorMessage = 'RESEND_API_KEY is not configured in .env file.';
    console.error(errorMessage);
    return {
      status: 'error',
      message: 'Email service is not configured. Please contact support.',
    }
  }

  try {
    const response = await resend.contacts.create({
      email: validatedFields.data.email,
      audienceId: audienceId,
    });

    if (response.error) {
      console.error('Resend API Error:', response.error);
      return {
        status: 'error',
        message: response.error.message || 'Could not subscribe. Please try again later.'
      };
    }

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again later.'
    }
  }

  redirect('/thank-you');
}
