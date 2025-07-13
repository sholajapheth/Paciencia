import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-block font-headline text-2xl tracking-tight"
      aria-label="SADE by shadebum Home"
    >
      SADE
    </Link>
  );
}
