import {createServer} from "miragejs";
import {Server} from "miragejs/server";
import * as uuid from "uuid";
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
                return {
                    session: uuid.v4(),
                    expires: moment.utc().unix() + 3600,
                    user: {
                        login: request.queryParams?.u,
                        fullName: "Dmitry Chubarov",
                    },
                }
            }, {timing: 800});

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
