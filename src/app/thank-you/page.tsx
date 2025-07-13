import { Button } from '@/components/ui/button';
import { MailCheck } from 'lucide-react';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4 text-center">
      <div className="max-w-md">
        <MailCheck className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-6 font-headline text-4xl sm:text-5xl">
          Thank You for Subscribing!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          You are now an Insider. Get ready for exclusive offers, early previews,
          and curated style tips delivered straight to your inbox.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
