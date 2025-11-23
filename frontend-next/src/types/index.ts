export interface SearchResult {
    title: string;
    feed_author?: string;
    feed_name?: string;
    article_author?: string[];
    url?: string;
    chunk_text?: string;
    score: number;
}
