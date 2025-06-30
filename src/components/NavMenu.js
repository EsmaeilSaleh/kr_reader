// src/components/NavMenu.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavMenu() {
    const pathname = usePathname();
    return (
        <li className="relative">
            <details className="group">
                <summary className="list-none cursor-pointer hover:text-black">Chapters ▾</summary>
                <ul
                    className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white border shadow-md rounded flex flex-col z-50 transition-all duration-150"
                    onClick={(e) => e.target.closest('details')?.removeAttribute('open')}
                >
                    <li>
                        <Link
                            href="/chapter/1"
                            className={`px-6 py-6 text-lg text-center ${pathname === '/chapter/1' ? 'text-blue-400' : ''}`}
                        >
                            Chapter 1
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/chapter/2"
                            className={`px-6 py-6 text-lg text-center ${pathname === '/chapter/2' ? 'text-blue-400' : ''}`}
                        >
                            Chapter 2
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/chapter/3"
                            className={`px-6 py-6 text-lg text-center ${pathname === '/chapter/3' ? 'text-blue-400' : ''}`}
                        >
                            Chapter 3
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/chapter/4"
                            className={`px-6 py-6 text-lg text-center ${pathname === '/chapter/4' ? 'text-blue-400' : ''}`}
                        >
                            Chapter 4
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/chapter/5"
                            className={`px-6 py-6 text-lg text-center ${pathname === '/chapter/5' ? 'text-blue-400' : ''}`}
                        >
                            Chapter 5
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/chapter/6"
                            className={`px-6 py-6 text-lg text-center ${pathname === '/chapter/6' ? 'text-blue-400' : ''}`}
                        >
                            Chapter 6
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/chapter/7"
                            className={`px-6 py-6 text-lg text-center ${pathname === '/chapter/7' ? 'text-blue-400' : ''}`}
                        >
                            Chapter 7
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/chapter/8"
                            className={`px-6 py-6 text-lg text-center ${pathname === '/chapter/8' ? 'text-blue-400' : ''}`}
                        >
                            Chapter 8
                        </Link>
                    </li>
                </ul>
            </details>
        </li>
    );
}