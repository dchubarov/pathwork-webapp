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

    console.log("Installed local server (MirageJS) for mocking API requests.");
    return server;
}
