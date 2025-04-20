import React, { useState } from "react";

interface AccordionProps {
    title: string;
    children?: any;
    defaultOpen?: boolean;
}

const Accordion = ({
    title,
    children,
    defaultOpen = false,
}: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-zinc-700 rounded-lg mb-2">
            <button
                className={`${
                    isOpen ? "rounded-t-lg" : "rounded-lg"
                } w-full px-4 py-3 flex justify-between items-center bg-zinc-800 hover:bg-zinc-700 transition-colors`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-zinc-100">{title}</span>
                <svg
                    className={`w-5 h-5 text-zinc-100 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            <div
                className={`px-4 overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-96 py-4" : "max-h-0"
                }`}
            >
                <div className="text-zinc-100">{children}</div>
            </div>
        </div>
    );
};

export default Accordion;
