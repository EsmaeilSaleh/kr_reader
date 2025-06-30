import React from 'react';
import ReactMarkdown from 'react-markdown';
import TypingPractice from './TypingPractice';

export default function SubchapterLayout({ title, summary, code }) {
    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <ReactMarkdown
                components={{
                    p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                    code: ({ className, children, ...props }) => {
                        const isInline = !className;
                        return isInline ? (
                            <code className="dark:bg-gray-800 px-1 rounded" {...props}>{children}</code>
                        ) : (
                            <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-auto">
                                <code className={className} {...props}>{children}</code>
                            </pre>
                        );
                    },
                    li: ({ node, ...props }) => <li className="mb-1 list-disc ml-6" {...props} />,
                }}
            >
                {summary}
            </ReactMarkdown>
            <h2 className="text-xl font-semibold mt-8 mb-2">Code Practice</h2>
            <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-auto">
                <code>{code}</code>
            </pre>
            <TypingPractice target={code} />
        </div>
    );
}