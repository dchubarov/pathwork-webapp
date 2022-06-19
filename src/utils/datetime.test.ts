import {formatDateTime} from "./datetime";

test("Format date time", () => {
    expect(formatDateTime()).toEqual("Invalid date");
    expect(formatDateTime(new Date())).toMatch(/^\d{4}-\d{2}-\d{2}\s*\d{1,2}:\d{2}\s*(?:AM|PM)$/);
});
