"use client";

import { Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface AnswerSectionProps {
    answer: string;
    isStreaming: boolean;
    className?: string;
}

export function AnswerSection({ answer, isStreaming, className }: AnswerSectionProps) {
    const [copied, setCopied] = useState(false);

    if (!answer && !isStreaming) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(answer);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={cn("relative group", className)}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur transition duration-1000 group-hover:opacity-30" />
            <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-blue-600">
                        <Sparkles className="h-5 w-5" />
                        <h3 className="font-semibold">AI Answer</h3>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Copy answer"
                    >
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                </div>

                <div className="prose prose-blue prose-sm max-w-none text-gray-700 leading-relaxed break-words overflow-hidden">
                    <ReactMarkdown>{answer}</ReactMarkdown>
                    {isStreaming && (
                        <span className="inline-block w-2 h-4 ml-1 bg-blue-500 animate-pulse align-middle" />
                    )}
                </div>
            </div>
        </div>
    );
}
