import * as moment from "moment";

const defaultDateTimeFormat = "YYYY-MM-DD hh:mm A";
const defaultDateTimeSecondsFormat = "YYYY-MM-DD hh:mm:ss A";

export function formatDateTime(date?: moment.MomentInput, seconds?: boolean): string {
    return moment.utc(date, moment.ISO_8601).local().format(seconds ?
        defaultDateTimeSecondsFormat : defaultDateTimeFormat);
}
