import {UserId} from "@model/common";

/**
 * Change event.
 */
export interface ChangeDto {
    /** User who committed a change */
    user: UserId;
    /** Change timestamp, ISO-8601 formatted string */
    timestamp: string;
}

/**
 * Change history
 */
export type ChangeHistoryDto = Array<ChangeDto>;
