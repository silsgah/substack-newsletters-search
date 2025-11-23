import { SearchResult } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface AskRequest {
    query_text: string;
    feed_author?: string;
    feed_name?: string;
    article_author?: string[];
    title_keywords?: string;
    limit?: number;
    provider?: string;
    model?: string;
}

export interface AskResponse {
    query: string;
    provider: string;
    answer: string;
    sources: SearchResult[];
    model?: string;
    finish_reason?: string;
}

export async function searchUniqueTitles(params: any) {
    const response = await fetch(`${API_BASE_URL}/search/unique-titles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch unique titles");
    }
    return response.json();
}

export async function askQuestion(params: AskRequest): Promise<AskResponse> {
    const response = await fetch(`${API_BASE_URL}/search/ask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    if (!response.ok) {
        throw new Error("Failed to ask question");
    }
    return response.json();
}

export async function askQuestionStream(
    params: AskRequest,
    onChunk: (chunk: string) => void,
    onSources?: (sources: SearchResult[]) => void
) {
    try {
        const response = await fetch(`${API_BASE_URL}/search/ask/stream`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        if (!response.ok || !response.body) {
            throw new Error(`Failed to stream answer: ${response.status} ${response.statusText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let isFirstChunk = true;
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;

            if (isFirstChunk) {
                const newlineIndex = buffer.indexOf("\n");
                if (newlineIndex !== -1) {
                    const jsonLine = buffer.slice(0, newlineIndex);
                    try {
                        const data = JSON.parse(jsonLine);
                        if (data.sources && onSources) {
                            onSources(data.sources);
                        }
                        // Remove the JSON line from buffer
                        buffer = buffer.slice(newlineIndex + 1);
                    } catch (e) {
                        console.warn("Failed to parse sources JSON:", e);
                    }
                    isFirstChunk = false;
                }
            }

            // If we have processed the first chunk (or it wasn't JSON), stream the rest
            if (!isFirstChunk && buffer.length > 0) {
                onChunk(buffer);
                buffer = "";
            }
        }
    } catch (error) {
        console.error("Error in askQuestionStream:", error);
        throw error;
    }
}
