import axios, { AxiosError } from "axios";
import { APP_CONFIG } from "../configs";
import { toast } from "vue3-toastify";

export const axiosInstance = axios.create({
    baseURL: APP_CONFIG.apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent

    let cloneConfig = { ...config };

    if (cloneConfig.url?.match("/v1/auth/login")) {
        return cloneConfig;
    }

    const token = localStorage.getItem("token") || "";
    if (token) {
        cloneConfig.headers = {
            Authorization: `Bearer ${token}`,
        };
    }
    return cloneConfig;
});

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (!(error instanceof AxiosError)) {
            return Promise.reject(error);
        }

        const { response } = error;
        if (!response) {
            return Promise.reject(error);
        }

        const { status } = response;

        if (status >= 400 && status < 500) {
            return Promise.resolve(response);
        }

        if (status === 500) {
            const data = response.data;
            toast.error("Something went wrong!");
            return Promise.reject(data?.errors);
        }

        toast.error("Unexpected error, please contact admin for support!");
        return Promise.reject(error);
    }
);

export class HttpService {
    static async get(path, extraConfig) {
        return this.handleAPIResponse(await axiosInstance.get(path, extraConfig));
    }

    static async post(path, payload, extraConfig) {
        return this.handleAPIResponse(await axiosInstance.post(path, payload, extraConfig));
    }

    static async delete(path, extraConfig) {
        return this.handleAPIResponse(await axiosInstance.delete(path, extraConfig));
    }

    static async put(path, payload, extraConfig) {
        return this.handleAPIResponse(await axiosInstance.put(path, payload, extraConfig));
    }

    static async patch(path, payload, extraConfig) {
        return this.handleAPIResponse(await axiosInstance.patch(path, payload, extraConfig));
    }

    static handleAPIResponse(response) {
        return response.data;
    }
}
