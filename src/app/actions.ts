
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

export async function signUpAction(data: z.infer<typeof formSchema>) {
  const validatedFields = formSchema.safeParse(data);

  if (!validatedFields.success) {
    throw new Error(
      validatedFields.error.flatten().fieldErrors.email?.[0] || 'Invalid input.'
    );
  }

  if (!audienceId) {
    console.error('RESEND_AUDIENCE_ID is not configured in .env file.');
    throw new Error('Email service is not configured. Please contact support.');
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
    throw new Error('Could not subscribe. Please try again later.');
  }

  // On successful "submission", redirect to the thank you page.
  redirect('/thank-you');
}
