// src/components/NavMenu.js
'use client';

import Link from 'next/link';

export default function NavMenu() {
    return (
        <li className="relative">
            <details className="group">
                <summary className="list-none cursor-pointer hover:text-black">Chapters ▾</summary>
                <ul
                    className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white border shadow-md rounded flex flex-col z-50 transition-all duration-150"
                    onClick={(e) => e.target.closest('details')?.removeAttribute('open')}
                >
                    <li>
                        <Link href="/chapter/1" className="px-6 py-3 text-lg hover:bg-gray-100 text-center">
                            Chapter 1
                        </Link>
                    </li>
                    <li>
                        <Link href="/chapter/2" className="px-6 py-3 text-lg hover:bg-gray-100 text-center">
                            Chapter 2
                        </Link>
                    </li>
                    <li>
                        <Link href="/chapter/3" className="px-6 py-3 text-lg hover:bg-gray-100 text-center">
                            Chapter 3
                        </Link>
                    </li>
                    <li>
                        <Link href="/chapter/4" className="px-6 py-3 text-lg hover:bg-gray-100 text-center">
                            Chapter 4
                        </Link>
                    </li>
                    <li>
                        <Link href="/chapter/5" className="px-6 py-3 text-lg hover:bg-gray-100 text-center">
                            Chapter 5
                        </Link>
                    </li>
                    <li>
                        <Link href="/chapter/6" className="px-6 py-3 text-lg hover:bg-gray-100 text-center">
                            Chapter 6
                        </Link>
                    </li>
                    <li>
                        <Link href="/chapter/7" className="px-6 py-3 text-lg hover:bg-gray-100 text-center">
                            Chapter 7
                        </Link>
                    </li>
                    <li>
                        <Link href="/chapter/8" className="px-6 py-3 text-lg hover:bg-gray-100 text-center">
                            Chapter 8
                        </Link>
                    </li>
                </ul>
            </details>
        </li>
    );
}