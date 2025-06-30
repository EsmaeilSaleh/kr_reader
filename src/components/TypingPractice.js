import React, { useState } from 'react';

export default function TypingPractice({ target }) {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            const newValue = input.slice(0, selectionStart) + '    ' + input.slice(selectionEnd);
            setInput(newValue);
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = selectionStart + 4;
            }, 0);
        }
    };

    const renderDiff = () => {
        return target.split('').map((char, idx) => {
            const typedChar = input[idx];
            let className = '';

            if (typedChar === undefined) className = '';
            else if (typedChar === char) className = 'text-green-500';
            else className = 'text-red-500';

            return (
                <span key={idx} className={className}>
                    {char}
                </span>
            );
        });
    };

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Typing Practice</h3>
            <div className="bg-gray-500 p-4 rounded whitespace-pre-wrap font-mono text-sm mb-4">
                {renderDiff()}
            </div>
            <textarea
                className="w-full h-32 p-2 border rounded font-mono text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Start typing here..."
            />
        </div>
    );
}