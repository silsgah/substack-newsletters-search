"use client";

import { ExternalLink, User, Rss } from "lucide-react";
import { SearchResult } from "@/types";
import { cn } from "@/lib/utils";

interface ResultsListProps {
    results: SearchResult[];
    className?: string;
}

export function ResultsList({ results, className }: ResultsListProps) {
    if (results.length === 0) return null;

    return (
        <div className={cn("space-y-4", className)}>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                Sources ({results.length})
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {results.map((result, index) => (
                    <a
                        key={index}
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200"
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="space-y-2 min-w-0">
                                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {result.title}
                                </h4>

                                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                    {result.feed_author && (
                                        <div className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            <span>{result.feed_author}</span>
                                        </div>
                                    )}
                                    {result.feed_name && (
                                        <div className="flex items-center gap-1">
                                            <Rss className="h-3 w-3" />
                                            <span>{result.feed_name}</span>
                                        </div>
                                    )}
                                    <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                                        Score: {result.score.toFixed(2)}
                                    </span>
                                </div>

                                {result.chunk_text && (
                                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                                        {result.chunk_text}
                                    </p>
                                )}
                            </div>
                            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
