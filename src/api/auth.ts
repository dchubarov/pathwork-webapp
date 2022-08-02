import {GenericApi} from "./base";
import {LoginResponse, LogoutResponse} from "@model/auth";

class AuthApi extends GenericApi {

    /**
     * Invokes user login API method.
     *
     * @param user user name
     * @param password password
     */
    async login(user: string, password: string) {
        const credentials = btoa(`${user}:${password}`);
        return this.getForObject<LoginResponse>("/auth/login", undefined,
            {Authorization: `Basic ${credentials}`});
    }

    /**
     * Join existing session.
     *
     * @param session session id
     */
    async join(session: string) {
        return this.getForObject<LoginResponse>("/auth/join", {s: session});
    }

    /**
     * Invokes logout API method.
     */
    async logout(session: string) {
        return this.getForObject<LogoutResponse>("/auth/logout", {s: session});
    }
}

export default new AuthApi();
