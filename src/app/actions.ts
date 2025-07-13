
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
  status: string;
  message: string;
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
    const { data: responseData, error } = await resend.contacts.create({
      email: validatedFields.data.email,
      audienceId: audienceId,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return {
        status: 'error',
        message: error.message || 'Could not subscribe. Please try again later.'
      };
    }
    
    // Only redirect if the contact was created successfully
    if (responseData) {
      // The redirect will throw a NEXT_REDIRECT error, which is expected
      // This will be caught by Next.js and handled appropriately
      redirect('/thank-you');
    }

    // This part should not be reached if redirect happens, but as a fallback:
    return {
        status: 'success',
        message: 'Successfully subscribed!'
    };

  } catch (error) {
    // Check if this is the expected NEXT_REDIRECT error
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      // This is expected behavior, let it propagate
      throw error;
    }
    
    console.error('An unexpected error occurred:', error);
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again later.'
    }
  }
}
