import Link from 'next/link';
import { Logo } from './logo';

export function SiteFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:px-6 lg:px-8 sm:flex-row">
        <Logo />
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Paciencia. All rights reserved.
        </p>
       
      </div>
    </footer>
  );
}
