import { ArticlesResponse, SourcesResponse } from '../../types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ArticlesResponse): void {
        this.news.draw(data.articles);
    }

    drawSources(data: SourcesResponse): void {
        this.sources.draw(data.sources);
    }
}

export default AppView;
