import Image from 'next/image';
import { Tag, Eye, Sparkles } from 'lucide-react';

import { SignUpForm } from '@/components/sign-up-form';
import { Logo } from '@/components/logo';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
            src="/bg.png"
            alt="A stylish leather bag on a minimalist background"
            data-ai-hint="leather bag minimalist"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight">
            Paciencia
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Girl, we’ve been saving you a seat.

Style with soul. Beauty with purpose. Beyond The Rush.
            </p>
          </div>
        </section>


        {/* Value Proposition Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-headline text-3xl sm:text-4xl">
                The Insider's Privileges
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Subscribe for a curated journey into the world of luxury leather.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Tag className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">Exclusive Offers</h3>
                <p className="mt-2 text-muted-foreground">
                  Receive special discounts and promotions available only to our
                  subscribers.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Eye className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">First Previews</h3>
                <p className="mt-2 text-muted-foreground">
                  Be the first to see our new collections and limited-edition
                  releases.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Sparkles className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">Curated Style Tips</h3>
                <p className="mt-2 text-muted-foreground">
                  Get expert advice on how to style and care for your luxury
                  leather goods.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sign-up Section */}
        <section className="bg-secondary py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl sm:text-4xl">
                Join the Inner Circle
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Enter your email to unlock a world of elegance and exclusivity.
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
