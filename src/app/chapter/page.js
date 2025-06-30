// Pages: /chapter/page.js (or /chapter/index.js if using pages dir)

import Link from "next/link";
import chapter1 from "@/data/chapter1";
import chapter2 from "@/data/chapter2";
import chapter3 from "@/data/chapter3";
import chapter4 from "@/data/chapter4";
import chapter5 from "@/data/chapter5";
import chapter7 from "@/data/chapter7";
import chapter8 from "@/data/chapter8";

const chapters = { chapter1, chapter2, chapter3, chapter4, chapter5, chapter7, chapter8 };

export default function ChapterIndex() {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Chapters</h1>
            {Object.entries(chapters).map(([key, chapter]) => (
                <div key={key} className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
                    <ul className="space-y-1">
                        {chapter.sections.map((section) => (
                            <li key={section.id}>
                                <Link
                                    href={`/chapter/${section.id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    {section.id} — {section.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}