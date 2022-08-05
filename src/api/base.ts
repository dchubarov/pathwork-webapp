import axios, {AxiosRequestConfig} from "axios";

export class GenericApi {
    private readonly config: AxiosRequestConfig;

    constructor(config?: AxiosRequestConfig) {
        let url = (process.env.NODE_ENV !== "development" || process.env.REACT_APP_API_MOCKING !== "true") ?
            process.env.REACT_APP_API_SERVER || "" : "";

        url += (process.env.REACT_APP_API_ROOT || "");

        this.config = {
            baseURL: url,
            timeout: 1000,
            ...config
        }
    }

    protected async getForObject<T = any>(url: string, params?: any, headers?: Record<string, string>) {
        const response = await axios.request<T>({
            ...this.config,
            url: url,
            params: params,
            headers: {
                ...this.config.headers,
                ...headers,
                Accept: "application/json"
            }
        });

        return response.data;
    }
}
