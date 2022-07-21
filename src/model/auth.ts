
export interface LoginResponse {
    /** Session ID */
    session: string;
    /** Session not valid after (unix) */
    expires: number;
    /** User name */
    user: string;
}

export interface LogoutResponse {
    // no members
}
