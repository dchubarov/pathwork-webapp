
export interface LoginResponse {
    /** Session ID */
    session: string;
    /** Session not valid after (unix) */
    expires: number;
    /** User name */
    user: string;
    /** User's full name */
    fullName?: string;
}

export interface LogoutResponse {
    // no members
}
