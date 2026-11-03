import './sources.css';
import { NewsSource } from '../../../types';

class Sources {
    private getElement<T extends HTMLElement>(parent: ParentNode, selector: string): T {
        const element = parent.querySelector<T>(selector);

        if (!element) {
            throw new Error(`Element not found: ${selector}`);
        }

        return element;
    }

    public draw(data: NewsSource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = this.getElement<HTMLTemplateElement>(document, '#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceName = this.getElement<HTMLElement>(sourceClone, '.source__item-name');
            sourceName.textContent = item.name;

            const sourceItem = this.getElement<HTMLElement>(sourceClone, '.source__item');
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = this.getElement<HTMLElement>(document, '.sources');
        sourcesContainer.append(fragment);
    }
}

export default Sources;
