import { HTTP_METHOD, HttpMethod, RequestConfig, RequestOptions } from '../../types';

class Loader {
    private readonly baseLink: string;
    private readonly options: Readonly<RequestOptions>;

    constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: RequestConfig,
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        },
        onError: (error: Error) => void = (error) => {
            console.error(error);
        }
    ): void {
        this.load<T>(HTTP_METHOD.GET, endpoint, callback, options, onError);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(
        method: HttpMethod,
        endpoint: string,
        callback: (data: T) => void,
        options: RequestOptions = {},
        onError: (error: Error) => void = (error) => {
            console.error(error);
        }
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err: Error) => onError(err));
    }
}

export default Loader;
