'use client';

import chapter1 from '@/data/chapter1';
import SubchapterLayout from '@/components/SubchapterLayout';

export default function ChapterPage() {
    // For now, we only load Chapter 1, Section 1 (hardcoded)
    const section = chapter1.sections[0];

    return (
        <SubchapterLayout
            title={`${chapter1.title} — ${section.title}`}
            summary={section.summary}
            code={section.code}
        />
    );
}
