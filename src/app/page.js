import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">📘 The C Programming Language (K&amp;R)</h1>
      <blockquote className="italic text-blue-300 text-center max-w-2xl mb-6">
        C is not just a language, its a gateway to understanding the soul of computers.
      </blockquote>
      <p className="text-lg mb-4 max-w-xl text-center">
        Dive into the timeless classic with a modern twist. Read, type, and explore each section of K&amp;R with interactive clarity.
      </p>
      <Link
        href="/chapters/1.1"
        className="mt-6 px-6 py-3 rounded bg-blue-600 hover:bg-blue-500 transition text-white font-semibold"
      >
        Start with Chapter 1 →
      </Link>
      <p className="text-sm text-gray-500 mt-6">
        💡 On mobile, swipe left/right to navigate between sections.
      </p>
    </div>
  );
}
