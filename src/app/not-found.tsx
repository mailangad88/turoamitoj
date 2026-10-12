import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap py-24">
      <p className="eyebrow mb-3">404</p>
      <h1 className="font-display text-[36px] font-semibold">That road&apos;s closed.</h1>
      <p className="mt-3 text-ink-soft">The page you&apos;re looking for doesn&apos;t exist. Try the fleet instead.</p>
      <Link href="/cars" className="btn-brand mt-6">See cars</Link>
    </section>
  );
}
