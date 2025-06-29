export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">📘 The C Programming Language (K&amp;R)</h1>
      <p className="text-lg mb-4 max-w-xl text-center">
        A visual companion and interactive guide to the classic K&amp;R book. Read, type, and explore the book's content section by section.
      </p>
      <a
        href="/chapter/1.1"
        className="mt-6 px-6 py-3 rounded bg-blue-600 hover:bg-blue-500 transition text-white font-semibold"
      >
        Start with Chapter 1 →
      </a>
    </div>
  );
}
