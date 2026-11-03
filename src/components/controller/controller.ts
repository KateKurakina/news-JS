import AppLoader from './appLoader';
import { ApiEndpoint, SourcesResponse, ArticlesResponse } from '../../types';

class AppController extends AppLoader {
    getSources(callback: (data: SourcesResponse) => void, onError: (error: Error) => void): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: ApiEndpoint.Sources,
            },
            callback,
            onError
        );
    }

    getNews(e: MouseEvent, callback: (data: ArticlesResponse) => void, onError: (error: Error) => void): void {
        let target: HTMLElement | null = e.target instanceof HTMLElement ? e.target : null;
        const newsContainer = e.currentTarget;

        if (!(newsContainer instanceof HTMLElement)) {
            return;
        }

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    super.getResp<ArticlesResponse>(
                        {
                            endpoint: ApiEndpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback,
                        onError
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
