import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4 text-center">
      <div className="max-w-md">
       
        <h1 className="mt-6 font-headline text-3xl sm:text-4xl">
          Oh my God, you're in! 💚
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We're so glad you made it. You'll be the first to know when something beautiful is coming - from limited releases to updates and a few sweet surprises along the way.
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          There is a lot to look forward to.
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          Until then, keep an eye on your inbox (and just in case, check promotions or spam - sometimes the good stuff gets misplaced.)
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
