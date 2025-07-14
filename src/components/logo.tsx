import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-block font-headline text-2xl tracking-tight  items-center justify-center"
      aria-label="Paciencia Home"
    >
      <Image src="/logo.png" alt="Paciencia" className='w-[150px] md:w-[170px] h-auto' width={100} height={100} />
    </Link>
  );
}
