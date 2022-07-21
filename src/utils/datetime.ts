import * as moment from "moment";
import {TFunction} from "i18next";

const defaultDateTimeFormat = "YYYY-MM-DD hh:mm A";
const defaultDateTimeSecondsFormat = "YYYY-MM-DD hh:mm:ss A";

export function formatDateTime(date?: moment.MomentInput, seconds?: boolean): string {
    return moment.utc(date, moment.ISO_8601).local().format(seconds ?
        defaultDateTimeSecondsFormat : defaultDateTimeFormat);
}

export function relativeTime(date: moment.MomentInput, current?: moment.MomentInput): ({
    n?: number;
    interval: "years" | "months" | "weeks" | "days" | "hours" | "minutes" | "now";
}) {
    const SecondInterval = 1;
    const MinuteInterval = SecondInterval * 60;
    const HourInterval = MinuteInterval * 60;
    const DayInterval = HourInterval * 24;
    const WeekInterval = DayInterval * 7;
    const MonthInterval = DayInterval * 31;
    const YearInterval = DayInterval * 365;

    const n = moment.utc(current).unix() - moment.utc(date).unix();
    if (n >= YearInterval)
        return {n: Math.floor(n / YearInterval), interval: "years"};
    else if (n >= MonthInterval)
        return {n: Math.floor(n / MonthInterval), interval: "months"};
    else if (n >= WeekInterval)
        return {n: Math.floor(n / WeekInterval), interval: "weeks"};
    else if (n >= DayInterval)
        return {n: Math.floor(n / DayInterval), interval: "days"};
    else if (n >= HourInterval)
        return {n: Math.floor(n / HourInterval), interval: "hours"};
    else if (n >= MinuteInterval)
        return {n: Math.floor(n / MinuteInterval), interval: "minutes"};
    else
        return {interval: "now"}; // just now (<1m)
}

export function relativeTimeT(t: TFunction, date: moment.MomentInput, current?: moment.MomentInput, format: "full" | "short" = "full"): string {
    const rel = relativeTime(date, current);
    return t(
        `time.${format}.${rel.interval}`,
        `${rel.n} ${rel.interval}`,
        {
            ns: "common",
            count: rel.n
        });
}
