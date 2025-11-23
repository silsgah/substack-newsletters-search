"use client";

import { useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { FilterPanel } from "@/components/filter-panel";
import { ResultsList } from "@/components/results-list";
import { AnswerSection } from "@/components/answer-section";
import { askQuestionStream, searchUniqueTitles } from "@/lib/api";
import { SearchResult } from "@/types";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [answer, setAnswer] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    feed_author: "",
    feed_name: "",
    title_keywords: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);
    setResults([]);
    setAnswer("");
    setIsStreaming(true);

    try {
      const searchParams = {
        query_text: searchQuery,
        ...filters,
        limit: 5,
      };

      // Launch search for sources
      const sourcesPromise = searchUniqueTitles(searchParams)
        .then((res) => {
          setResults(res.results);
        })
        .catch((err) => console.error("Failed to fetch sources", err));

      // Launch answer stream
      const streamPromise = askQuestionStream(
        {
          ...searchParams,
          provider: "OpenRouter", // Default
          model: "openai/gpt-4o-mini", // Default or make configurable
        },
        (chunk) => {
          setAnswer((prev) => prev + chunk);
        }
      );

      await Promise.all([sourcesPromise, streamPromise]);
    } catch (error) {
      console.error("Search failed", error);
      setAnswer("Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Substack Search
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Search across your favorite newsletters and get AI-powered answers.
        </p>
      </div>

      <div className="sticky top-4 z-10 glass-panel rounded-2xl p-2 transition-all duration-200">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <AnswerSection answer={answer} isStreaming={isStreaming} />
        </div>
        <div className="lg:col-span-1">
          <ResultsList results={results} />
        </div>
      </div>
    </main>
  );
}
