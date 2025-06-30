'use client';

import { useParams } from 'next/navigation';
import chapter1 from '@/data/chapter1';
import chapter8 from '@/data/chapter8';
import SubchapterLayout from '@/components/SubchapterLayout';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';

const chapters = {
    chapter1,
    chapter8
}

export default function ChapterPage() {
    const id = useParams().id;
    const chapterKey = `chapter${id.split('.')[0]}`;
    const chapter = chapters[chapterKey];

    if (!chapter) return <div>Chapter not found.</div>;

    const section = chapter?.sections?.find((s) => s.id === id);
    if (!section) return <div>Section not found.</div>;

    const router = useRouter();
    const allSections = chapter?.sections || [];
    const currentIndex = allSections.findIndex((s) => s.id === id);

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

    return (
        <div {...handlers}>
            <SubchapterLayout
                key={section.id}
                title={`${chapter.title} — ${section.title}`}
                summary={section.summary}
                code={section.code}
            />
        </div>
    );
}
