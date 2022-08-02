import {Server} from "miragejs/server";
import {installMockServer} from "./mock";
import healthApi from "./health";
import authApi from "./auth";

let _mockServer: Server;

beforeEach(() => {
    _mockServer = installMockServer();
});

afterEach(() => {
    _mockServer.shutdown();
});

test("mock server is responding", async () => {
    const result = await healthApi.checkHealth();
    expect(result).toBe(true);
});

test("mock server authentication", async () => {
    const response = await authApi.login("dime", "123");
    expect(response.user.login).toBe("dime");
    // await axios.get(process.env.REACT_APP_API_ROOT + "/auth/login?u=dime&p=123")
    //     .then(response => console.log(response.data));
});
