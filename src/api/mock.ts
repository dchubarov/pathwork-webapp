import {createServer, Response} from "miragejs";
import {Server} from "miragejs/server";
import moment from "moment";
import {LogoutResponse} from "@model/auth";

export function installMockServer(): Server {
    const server = createServer({
        namespace: process.env.REACT_APP_API_ROOT,
        routes() {
            // health check
            this.get("/health",
                () => ({status: "OK"}));

            this.get("/auth/login", (_, request) => {
                const a = request.requestHeaders["Authorization"];
                if (a.startsWith("Basic")) {
                    const c = atob(a.substring(6)).split(":");
                    if (c.length > 1 && (c[0] === "dime" || c[0] === "dime@twowls.org"))
                        return {
                            ...require("./mockdata/auth.login.dime.json"),
                            expires: moment.utc().unix() + 86400
                        }
                }

                return new Response(401);
            }, {timing: 500});

            this.get("/auth/join", (_, request) => {
                const session = request.queryParams?.s;
                return session === "ootuong2Ait0oshi" ? {
                    ...require("./mockdata/auth.login.dime.json"),
                    expires: moment.utc().unix() + 3600
                } : new Response(401);
            }, {timing: 100});

            this.get("/auth/logout", () => {
                return {} as LogoutResponse;
            }, {timing: 200});

            this.get("/blog/recent/",
                (_, request) => {
                    let p = parseInt(request.queryParams?.p);
                    if (p === undefined) p = 1;
                    return p >= 1 && p <= 3 ?
                        require(`./mockdata/blog.page${p}.json`) :
                        require("./mockdata/blog.pageX.json");
                },
                {timing: 500});

            this.get("/records/cards",
                (_, request) => {
                    let p = parseInt(request.queryParams?.p) || 1;
                    return p === 1 ?
                        require(`./mockdata/records.page${p}.json`) :
                        require("./mockdata/records.pageX.json");
                }, {timing: 500});

            this.logging = false;
        }
    });

    console.log(`[${new Date().toLocaleString()}] Installed local server (MirageJS) for mocking API requests. ` +
        "In order to switch to backend set REACT_APP_API_MOCKING to 'false'.");

    return server;
}
