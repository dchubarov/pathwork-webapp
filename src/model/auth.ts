export type TeamRole = "subscriber" | "contributor" | "admin";

export interface MembershipDto {
    /** Team id */
    readonly team: string;
    /** Team common name */
    readonly cn?: string;
    /** Membership role */
    readonly role: TeamRole;
}

export interface UserDto {
    /** User login */
    readonly login: string;
    /** User email */
    readonly email?: string;
    /** User common name */
    readonly cn?: string;
    /** Team membership */
    readonly memberOf?: MembershipDto[];
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
    // intentionally no members
}
