import { getCookie } from "../cookies";


export class APIConsumer<Tin, Tout> {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get(id: string, cache: RequestCache = "no-cache") {
        const response = await fetch(this.baseUrl + id, {
            cache: cache,
            credentials: "include"
        });

        const data: Tout = await response.json();
        return data;
    }

    async getBlob(cache: RequestCache = "no-cache", query: any = undefined) {
        let searchParams = "";

        if (query) {
            query["limit"] = 10000;
            searchParams = '?' + toQuery(query);
        }

        const response = await fetch(this.baseUrl + searchParams, {
            cache: cache,
            credentials: "include"
        });

        return await response.blob();
    }

    async list(cache: RequestCache = "no-cache", query: any = undefined) {
        let searchParams = "";

        if (query) {
            query["limit"] = 10000;
            searchParams = '?' + toQuery(query);
        }

        const response = await fetch(this.baseUrl + searchParams, {
            cache: cache,
            credentials: "include"
        });

        const data: Tout[] = (await response.json()).items;
        return data;
    }

    async post(data: Tin, headers = new Headers({ "Content-Type": "application/json" })) {
        // Try to get the csrftoken in the cookies
        const csrfToken = getCookie("csrftoken");

        if (csrfToken) {
            headers.set("X-CSRFToken", csrfToken);
        }

        let body: any = data;

        if (headers.get("Content-Type") === "application/json") {
            body = JSON.stringify(data);
        }

        // Send request
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: headers,
            credentials: "include",
            body: body
        });

        return response;
    }

    async delete(id: string) {
        // Set request headers
        const headers: HeadersInit = {};

        // Try to get the csrftoken in the cookies
        const csrfToken = getCookie("csrftoken");

        if (csrfToken) {
            headers["X-CSRFToken"] = csrfToken;
        }

        // Send request
        const response = await fetch(this.baseUrl + id, {
            method: "DELETE",
            headers: headers,
            credentials: "include"
        });

        return response;
    }

    async put(id: string, data: Tin) {
        // Set request headers
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        // Try to get the csrftoken in the cookies
        const csrfToken = getCookie("csrftoken");

        if (csrfToken) {
            headers["X-CSRFToken"] = csrfToken;
        }

        // Send request
        const response = await fetch(this.baseUrl + id, {
            method: "PUT",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(data),
        });

        return response;
    }
}

export function toQuery(data: any): string {
    return Object.keys(data).reduce((acc: string[], cur: string) => {
        const value = data[cur];

        if (value === undefined || value === null) {
            return acc;
        }

        if (value instanceof Array) {
            return [...acc, ...value.map(v => `${cur}=${v}`)];
        }

        return [...acc, `${cur}=${value}`];
    }, []).join('&');
}

