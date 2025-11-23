"use client";

import { Filter, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
    filters: {
        feed_author?: string;
        feed_name?: string;
        title_keywords?: string;
    };
    onFilterChange: (key: string, value: string) => void;
    className?: string;
}

export function FilterPanel({ filters, onFilterChange, className }: FilterPanelProps) {
    const [isOpen, setIsOpen] = useState(false);

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    return (
        <div className={cn("w-full max-w-2xl mx-auto mt-4", className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        {activeFiltersCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="mt-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Feed Author
                        </label>
                        <input
                            type="text"
                            value={filters.feed_author || ""}
                            onChange={(e) => onFilterChange("feed_author", e.target.value)}
                            placeholder="e.g. Lenny Rachitsky"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Feed Name
                        </label>
                        <input
                            type="text"
                            value={filters.feed_name || ""}
                            onChange={(e) => onFilterChange("feed_name", e.target.value)}
                            placeholder="e.g. Lenny's Newsletter"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title Keywords
                        </label>
                        <input
                            type="text"
                            value={filters.title_keywords || ""}
                            onChange={(e) => onFilterChange("title_keywords", e.target.value)}
                            placeholder="e.g. AI, Growth, Product"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
