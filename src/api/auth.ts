import Api from "./base";
import {LoginResponse, LogoutResponse} from "@model/auth";

const AuthApi = {

    /**
     * Invokes user login API method.
     *
     * @param user user name
     * @param password password
     */
    login: (user: string, password: string) => Api
        .get<LoginResponse>("/auth/login", {
            u: user,
            p: password,
        }),

    /**
     * Join existing session.
     *
     * @param session session id
     */
    join: (session: string) => Api
        .get<LoginResponse>("/auth/join", {
            s: session,
        }),

    /**
     * Invokes logout API method.
     */
    logout: (session: string) => Api
        .get<LogoutResponse>("/auth/logout", {
            s: session
        }),
}

export default AuthApi;
