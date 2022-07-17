import {formatDateTime, relativeTime} from "./datetime";

test("Format date time", () => {
    expect(formatDateTime()).toEqual("Invalid date");
    expect(formatDateTime(new Date())).toMatch(/^\d{4}-\d{2}-\d{2}\s*\d{1,2}:\d{2}\s*(?:AM|PM)$/);
});

test("relative time", () => {
    expect(relativeTime("2022-07-14T10:30", "2022-07-14T10:30")).toStrictEqual({interval: "now"});
    expect(relativeTime("2022-07-14T10:15", "2022-07-14T10:30")).toStrictEqual({n: 15, interval: "minutes"});
    expect(relativeTime("2022-07-14T08:00", "2022-07-14T10:30")).toStrictEqual({n: 2, interval: "hours"});
    expect(relativeTime("2022-07-10T18:00", "2022-07-14T10:30")).toStrictEqual({n: 3, interval: "days"});
    expect(relativeTime("2022-06-28T18:00", "2022-07-14T10:30")).toStrictEqual({n: 2, interval: "weeks"});
    expect(relativeTime("2022-05-28T18:00", "2022-07-14T10:30")).toStrictEqual({n: 1, interval: "months"});
    expect(relativeTime("2010-05-28T18:00", "2022-07-14T10:30")).toStrictEqual({n: 12, interval: "years"});
});
