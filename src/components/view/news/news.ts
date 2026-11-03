import './news.css';
import { Article } from '../../../types';

class News {
    private getElement<T extends HTMLElement>(parent: ParentNode, selector: string): T {
        const element = parent.querySelector<T>(selector);

        if (!element) {
            throw new Error(`Element not found: ${selector}`);
        }

        return element;
    }

    draw(data: Article[]): void {
        const news = data.slice(0, 10);

        const fragment = document.createDocumentFragment();

        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem = this.getElement<HTMLElement>(newsClone, '.news__item');

            if (idx % 2) newsItem.classList.add('alt');

            const photo = this.getElement<HTMLElement>(newsClone, '.news__meta-photo');
            photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const author = this.getElement<HTMLElement>(newsClone, '.news__meta-author');
            author.textContent = item.author || item.source.name;

            const date = this.getElement<HTMLElement>(newsClone, '.news__meta-date');
            date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const title = this.getElement<HTMLElement>(newsClone, '.news__description-title');
            title.textContent = item.title;

            const source = this.getElement<HTMLElement>(newsClone, '.news__description-source');
            source.textContent = item.source.name;

            const content = this.getElement<HTMLElement>(newsClone, '.news__description-content');
            content.textContent = item.description;

            const readMoreLink = this.getElement<HTMLAnchorElement>(newsClone, '.news__read-more a');
            readMoreLink.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector<HTMLElement>('.news');

        if (!newsContainer) {
            return;
        }

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
