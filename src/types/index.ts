export enum ApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export type HttpMethod = 'GET';

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export type NewsSourcePreview = Pick<NewsSource, 'id' | 'name'>;

export type NewsSourceUpdate = Partial<NewsSource>;

export interface ArticlesResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface SourcesResponse {
    status: string;
    sources: NewsSource[];
}

export interface RequestOptions {
    [key: string]: string;
}

export interface RequestConfig {
    endpoint: ApiEndpoint;
    options?: RequestOptions;
}
