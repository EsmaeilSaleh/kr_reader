// Pages: /chapter/page.js (or /chapter/index.js if using pages dir)

import Link from "next/link";
import chapter1 from "@/data/chapter1";

export default function ChapterIndex() {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{chapter1.title}</h1>
            <ul className="space-y-2">
                {chapter1.sections.map((section) => (
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
    );
}