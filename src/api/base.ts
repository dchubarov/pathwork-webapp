import axios, {AxiosRequestConfig} from "axios";

const axiosBaseConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_ROOT,
}

function executeAxiosRequest<T>(config: AxiosRequestConfig): Promise<T> {
    return axios.request<T>(config)
        .then(response => response.data);
}

const Api = {
    get: <T>(url: string, requestParams?: any) => executeAxiosRequest<T>({
        ...axiosBaseConfig,
        method: "GET",
        url: url,
        params: requestParams,
    }),
}

export default Api;
