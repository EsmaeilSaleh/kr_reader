'use client';

import { useParams } from 'next/navigation';
import chapter1 from '@/data/chapter1';
import chapter8 from '@/data/chapter8';
import SubchapterLayout from '@/components/SubchapterLayout';

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

    return (
        <SubchapterLayout
            key={section.id}
            title={`${chapter.title} — ${section.title}`}
            summary={section.summary}
            code={section.code}
        />
    );
}
