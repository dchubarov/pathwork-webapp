import {createServer} from "miragejs";
import {Server} from "miragejs/server";

export function installMockServer(): Server {
    const server = createServer({
        namespace: process.env.REACT_APP_API_ROOT,
        routes() {
            // health check
            this.get("/health", () => ({
                status: "OK"
            }));

            this.logging = false;
        }
    });

    console.log(`${new Date().toLocaleString()} Installed local server (MirageJS) for mocking API requests. ` +
        "In order to switch to backend set REACT_APP_API_MOCKING to 'false'.");

    return server;
}
