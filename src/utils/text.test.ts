import {clipText} from "./text";

test("text clipping", () => {
    expect(clipText("", 10)).toBe("");
    expect(clipText(" ", 10)).toBe(" ");
    expect(clipText("Alpha bravo charlie", -1, true, ".")).toBe("Alpha bravo charlie");
    expect(clipText("Alpha bravo charlie", 10, true, ".")).toBe("Alpha brav.");
    expect(clipText("Alpha bravo charlie", 10, false, ".")).toBe("Alpha.");
    expect(clipText("Alpha bravo charlie", 5, false, ".")).toBe("Alpha.");
    // always breaks first word
    expect(clipText("Alpha bravo charlie", 4, false, ".")).toBe("Alph.");
    // ignores whitespace at start
    expect(clipText("   Alpha bravo charlie", 4, false, ".")).toBe("Alph.");
});
