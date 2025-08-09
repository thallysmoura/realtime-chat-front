import React from 'react';

const IframeMessage = ({ texto }) => {
    return (
        <div className="flex flex-col gap-1">
            <iframe
                src={texto}
                className="w-full h-48 rounded-lg border border-gray-300"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                loading="lazy"
            />
            <a
                href={texto}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
            >
                {texto}
            </a>
        </div>
    );
};

export default IframeMessage;