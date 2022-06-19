import {Optional} from "./optional";

test("optional emptiness", () => {
    expect(Optional.empty().present()).toBe(false);
    expect(Optional.of(null).present()).toBe(false);
    expect(Optional.of(undefined).present()).toBe(false);
    expect(Optional.of(100).present()).toBe(true);
    expect(Optional.of(NaN).present()).toBe(true);
    expect(Optional.of("test").present()).toBe(true);
    expect(Optional.of("").present()).toBe(true);
});

test("optional defaulting", () => {
    expect(Optional.empty<number>().or(100)).toEqual(100);
    expect(Optional.of<string>(null).or("test")).toEqual("test");
    expect(Optional.of("X").filter(v => v === "Z").orUndefined()).toEqual(undefined);
});

test("optional mappers", () => {
    expect(Optional.of("100").map(x => parseInt(x)).or(-1)).toEqual(100);
});

test("optional filters", () => {
    expect(Optional.of("zzz").map(x => parseInt(x)).filter(v => !isNaN(v)).or(-1)).toEqual(-1);
});

test("optional presence", () => {
    let v0 = 0;
    Optional.of(500).ifPresent(v => v0 = v);
    expect(v0).toEqual(500);
});
