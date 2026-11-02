import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const isProduction = process.env.NODE_ENV === 'production';

        if (isProduction) {
            super('https://rss-news-api.onrender.com/mocks/', {});
            return;
        }

        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;

        if (!apiUrl || !apiKey) {
            throw new Error('API_URL and API_KEY must be defined in the environment');
        }

        super(apiUrl, {
            apiKey,
        });
    }
}

export default AppLoader;
