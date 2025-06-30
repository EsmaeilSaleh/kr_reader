// src/components/NavMenu.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function NavMenu() {
    const pathname = usePathname();
    const chapterNumber = pathname?.split('/')[2]?.split('.')[0];

    const detailsRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (detailsRef.current && !detailsRef.current.contains(event.target)) {
                detailsRef.current.removeAttribute('open');
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <li className="relative">
            <details className="group" ref={detailsRef}>
                <summary className="list-none cursor-pointer hover:text-black">Chapters ▾</summary>
                <ul
                    className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white border shadow-md rounded flex flex-col z-50 transition-all duration-150"
                    onClick={(e) => e.target.closest('details')?.removeAttribute('open')}
                >
                    <Link href="/chapters/1">
                        <li className={`px-1 py-2 text-lg text-center ${chapterNumber === '1' ? 'text-blue-400' : ''}`}>
                            Chapter 1
                        </li>
                    </Link>
                    <Link href="/chapters/2">
                        <li className={`px-1 py-2 text-lg text-center ${chapterNumber === '2' ? 'text-blue-400' : ''}`}>
                            Chapter 2
                        </li>
                    </Link>
                    <Link href="/chapters/3">
                        <li className={`px-1 py-2 text-lg text-center ${chapterNumber === '3' ? 'text-blue-400' : ''}`}>
                            Chapter 3
                        </li>
                    </Link>
                    <Link href="/chapters/4">
                        <li className={`px-1 py-2 text-lg text-center ${chapterNumber === '4' ? 'text-blue-400' : ''}`}>
                            Chapter 4
                        </li>
                    </Link>
                    <Link href="/chapters/5">
                        <li className={`px-1 py-2 text-lg text-center ${chapterNumber === '5' ? 'text-blue-400' : ''}`}>
                            Chapter 5
                        </li>
                    </Link>
                    <Link href="/chapters/6">
                        <li className={`px-1 py-2 text-lg text-center ${chapterNumber === '6' ? 'text-blue-400' : ''}`}>
                            Chapter 6
                        </li>
                    </Link>
                    <Link href="/chapters/7">
                        <li className={`px-1 py-2 text-lg text-center ${chapterNumber === '7' ? 'text-blue-400' : ''}`}>
                            Chapter 7
                        </li>
                    </Link>
                    <Link href="/chapters/8">
                        <li className={`px-1 py-2 text-lg text-center ${chapterNumber === '8' ? 'text-blue-400' : ''}`}>
                            Chapter 8
                        </li>
                    </Link>
                </ul>
            </details>
        </li>
    );
}