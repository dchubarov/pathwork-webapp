
export interface UserDto {
    /** User login */
    readonly login: string;
    /** User display name */
    readonly fullName?: string;
}

export interface LoginResponse {
    /** Session id */
    readonly session: string;
    /** Session not valid after (Unix time) */
    readonly expires: number;
    /** User info */
    readonly user: UserDto;
}

export interface LogoutResponse {
    // no members
}
