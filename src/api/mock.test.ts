import {Server} from "miragejs/server";
import {installMockServer} from "./mock";
import axios from "axios";

let _mockServer: Server;

beforeEach(() => {
    _mockServer = installMockServer();
});

afterEach(() => {
    _mockServer.shutdown();
});

test("mock server is responding", async () => {
    await axios.get(process.env.REACT_APP_API_ROOT + "/health")
        .then(response => expect(response.data).toEqual({status: "OK"}));
});

test("mock server authentication", async () => {
    await axios.get(process.env.REACT_APP_API_ROOT + "/auth/login?u=dime&p=123")
        .then(response => console.log(response.data));
});
