"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
    onSearch: (query: string) => void;
    onReset?: () => void;
    isLoading?: boolean;
    className?: string;
}

export function SearchBar({ onSearch, onReset, isLoading, className }: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    const handleReset = () => {
        setQuery("");
        onReset?.();
    };

    return (
        <form onSubmit={handleSubmit} className={cn("relative w-full max-w-2xl mx-auto", className)}>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask anything about your newsletters..."
                    className="block w-full pl-11 pr-32 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-lg text-gray-900 placeholder:text-gray-400"
                    disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-2 flex items-center gap-2">
                    {query && (
                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={isLoading}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Clear search"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={!query.trim() || isLoading}
                        className="p-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isLoading ? (
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <span className="text-sm font-medium px-2">Search</span>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
