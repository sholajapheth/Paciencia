import Image from 'next/image';
import { Tag, Eye, Sparkles } from 'lucide-react';

import { SignUpForm } from '@/components/sign-up-form';
import { Logo } from '@/components/logo';
import { SiteFooter } from '@/components/site-footer';


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Logo />
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] w-full">
          <Image
            src="/bg.jpeg"
            alt="A stylish bag on a minimalist background"
            data-ai-hint="bag minimalist"
            fill
            className="object-cover rotate-180"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight">
            Paciencia
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Your Patience is Your Power.
            </p>
          </div>
        </section>


        {/* Value Proposition Section */}
        {/* <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-headline text-3xl sm:text-4xl">
                Join the list to receive early access to our next drop, private offers, and what's unfolding behind the scenes.
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">
                We won't email often. Just when it matters.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Tag className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">Early Access</h3>
                <p className="mt-2 text-muted-foreground">
                  Be the first to know about our next drop and get exclusive access to new releases.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Eye className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">Private Offers</h3>
                <p className="mt-2 text-muted-foreground">
                  Receive special discounts and promotions available only to our subscribers.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Sparkles className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">Behind the Scenes</h3>
                <p className="mt-2 text-muted-foreground">
                  Get exclusive insights into our creative process and what's coming next.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Sign-up Section */}
        <section className="bg-secondary py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              {/* <h2 className="font-headline text-3xl sm:text-4xl">
                Made for you.
              </h2> */}
              <p className="mt-2 text-3xl text-muted-foreground">
                Join the list to receive early access to our next drop, private offers, and what's unfolding behind the scenes.
              </p>
              <SignUpForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
