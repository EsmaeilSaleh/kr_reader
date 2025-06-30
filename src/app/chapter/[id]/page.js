'use client';
import Link from "next/link";
import { useParams } from 'next/navigation';
import chapter1 from '@/data/chapter1';
import chapter2 from '@/data/chapter2';
import chapter3 from '@/data/chapter3';
import chapter4 from '@/data/chapter4';
import chapter5 from '@/data/chapter5';
import chapter6 from '@/data/chapter6';
import chapter7 from '@/data/chapter7';
import chapter8 from '@/data/chapter8';
import SubchapterLayout from '@/components/SubchapterLayout';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const chapters = {
    chapter1,
    chapter2,
    chapter3,
    chapter4,
    chapter5,
    chapter6,
    chapter7,
    chapter8
}

export default function ChapterPage() {
    const id = useParams().id;
    const chapterKey = `chapter${id.split('.')[0]}`;
    const chapter = chapters[chapterKey];

    const router = useRouter();
    const allSections = chapter?.sections || [];
    const currentIndex = allSections.findIndex((s) => s.id === id);

    const [isMobile, setIsMobile] = useState(false);
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    useEffect(() => {
        const seen = localStorage.getItem('swipeHintShown');
        if (!seen && id.includes('.')) {
            setShowHint(true);
            setTimeout(() => setShowHint(false), 5000);
            localStorage.setItem('swipeHintShown', 'true');
        }
    }, [id]);

    const goToSection = (index) => {
        if (index >= 0 && index < allSections.length) {
            const nextId = allSections[index].id;
            router.push(`/chapter/${nextId}`);
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => goToSection(currentIndex + 1),
        onSwipedRight: () => goToSection(currentIndex - 1),
        preventDefaultTouchmoveEvent: true,
        trackTouch: true
    });

    if (!chapter) return <div>Chapter not found.</div>;
    const section = chapter?.sections?.find((s) => s.id === id);
    if (id.indexOf('.') === -1) {
        return (
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">{chapter.title}</h1>
                <ul className="space-y-2">
                    {chapter.sections.map((s) => (
                        <li key={s.id}>
                            <Link
                                href={`/chapter/${s.id}`}
                                className="text-blue-600 hover:underline"
                            >
                                {s.id} — {s.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                <p className="text-sm text-gray-500 mt-6">
                    💡 On mobile, swipe left/right to navigate between sections.
                </p>
            </div>
        );
    }
    if (!section) return <div>Section not found.</div>;

    return (
        <div {...handlers}>
            {isMobile && showHint && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-2 rounded shadow-md z-50">
                    👉 Tip: You can swipe left/right to move between sections!
                </div>
            )}
            <SubchapterLayout
                key={section.id}
                title={`${chapter.title} — ${section.title}`}
                summary={section.summary}
                code={section.code}
            />

        </div>
    );
}
