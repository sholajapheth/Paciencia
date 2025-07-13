import { EmailGeneratorForm } from '@/components/email-generator-form';
import { Logo } from '@/components/logo';
import { SiteFooter } from '@/components/site-footer';
import { Separator } from '@/components/ui/separator';
import { Mail } from 'lucide-react';

export default function EmailGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Logo />
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4">
          <Mail className="h-8 w-8 text-primary" />
          <div>
            <h1 className="font-headline text-4xl">
              AI-Powered Email Content Generator
            </h1>
            <p className="text-muted-foreground">
              Craft compelling email marketing campaigns with the help of AI.
            </p>
          </div>
        </div>
        <Separator className="my-8" />
        <EmailGeneratorForm />
      </main>
      <SiteFooter />
    </div>
  );
}
