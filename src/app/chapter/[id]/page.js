'use client';

import { useParams } from 'next/navigation';
import chapter1 from '@/data/chapter1';
import SubchapterLayout from '@/components/SubchapterLayout';

export default function ChapterPage() {
    const { id } = useParams();
    const section = chapter1.sections.find((sec) => sec.id === id);

    if (!section) return <div>Section not found.</div>;

    return (
        <SubchapterLayout
            title={`${chapter1.title} — ${section.title}`}
            summary={section.summary}
            code={section.code}
        />
    );
}
