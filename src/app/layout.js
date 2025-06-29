import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "K&R Reader",
  description: "A visual and interactive guide to The C Programming Language (K&R)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-white border-b shadow-sm px-6 py-3 sticky top-0 z-50">
          <nav className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-gray-800 hover:text-black">
              K&R Reader
            </Link>
            <ul className="flex gap-6 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-black">Home</Link>
              </li>
              <li className="relative group">
                <span className="hover:text-black cursor-pointer">Chapter 1 ▾</span>
                <ul className="absolute left-0 mt-2 w-40 bg-white border shadow-md rounded invisible opacity-0 group-hover:visible group-hover:opacity-100 flex flex-col z-50 transition-all duration-150">
                  <li>
                    <Link href="/chapter/1.1" className="block px-4 py-2 hover:bg-gray-100">1.1 Getting Started</Link>
                  </li>
                  <li>
                    <Link href="/chapter/1.2" className="block px-4 py-2 hover:bg-gray-100">1.2 Variables & Arithmetic</Link>
                  </li>
                  <li>
                    <Link href="/chapter/1.3" className="block px-4 py-2 hover:bg-gray-100">1.3 For Statement</Link>
                  </li>
                  <li>
                    <Link href="/chapter" className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-500">See All...</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="https://github.com/EsmaeilSaleh/kr_reader" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                  GitHub
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
