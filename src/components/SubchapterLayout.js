

import React from 'react';

export default function SubchapterLayout({ title, summary, code }) {
    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <div className="bg-white rounded shadow p-4 text-gray-800 whitespace-pre-wrap text-base leading-relaxed">
                {summary}
            </div>
            <h2 className="text-xl font-semibold mt-8 mb-2">Code Practice</h2>
            <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-auto">
                <code>{code}</code>
            </pre>
        </div>
    );
}