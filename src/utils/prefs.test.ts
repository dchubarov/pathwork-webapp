import {findPreferenceValue, initPreferences, mergePreferences, PreferenceInit} from "./prefs";
import {split} from "lodash";
import {PaletteMode} from "@mui/material";

test("invalid init or merge object", () => {
    // initializer must be an object
    expect(() => initPreferences(null)).toThrow();
    expect(() => initPreferences(undefined)).toThrow();
    expect(() => initPreferences(1000)).toThrow();
    expect(() => initPreferences("test")).toThrow();
    expect(() => initPreferences(["test"])).toThrow();
    expect(() => initPreferences([10, 50, 100])).toThrow();
    expect(() => initPreferences([])).toThrow();

    // preferences to be merged with must be an object, unless undefined
    expect(() => mergePreferences({}, null)).toThrow();
    expect(() => mergePreferences({}, 1000)).toThrow();
    expect(() => mergePreferences({}, "test")).toThrow();
    expect(() => mergePreferences({}, ["test"])).toThrow();
    expect(() => mergePreferences({}, [10, 50, 100])).toThrow();
    expect(() => mergePreferences({}, [])).toThrow();
});

test("init simple preferences", () => {
    const result = initPreferences({
        prop0: undefined,
        prop1: 10,
        prop2: "light",
        prop3: false,
        prop4: () => 10 + 7,
        prop5: null,
        prop6: new PreferenceInit(50),
        prop7: new PreferenceInit("dark"),
        prop8: new PreferenceInit(() => false),
        prop9: new PreferenceInit(() => 10 - 5),
        prop10: new PreferenceInit(null),
    });

    expect(Object.hasOwn(result, "prop0")).toBe(false);
    expect(result.prop1).toEqual(10);
    expect(result.prop2).toEqual("light");
    expect(result.prop3).toEqual(false);
    expect(result.prop4).toEqual(17);
    expect(result.prop5).toEqual(null);
    expect(result.prop6).toEqual(50);
    expect(result.prop7).toEqual("dark");
    expect(result.prop8).toEqual(false);
    expect(result.prop9).toEqual(5);
    expect(result.prop10).toEqual(null);
});

test("init hierarchical preferences", () => {
    const result = initPreferences({
        pref1: 100,
        pref2: {
            pref21: "solo",
            pref22: {
                pref221: () => 100 + 50,
                pref222: null
            }
        }
    });

    expect(result.pref1).toEqual(100);
    expect(result.pref2.pref21).toEqual("solo");
    expect(result.pref2.pref22.pref221).toEqual(150);
    expect(result.pref2.pref22.pref222).toEqual(null);
});

test("merge simple preferences without changes", () => {
    const current = {
        prop1: 10,
        prop2: "light",
        prop3: true,
        prop4: 17,
        prop5: null
    }

    const [result1, changed1] = mergePreferences({}, current);

    expect(changed1).toEqual(false);
    expect(result1).toBe(current);

    const [result2, changed2] = mergePreferences({
        prop1: () => 7 + 3,
        prop2: "light",
        prop5: () => null
    }, current);

    expect(changed2).toEqual(false);
    expect(result2).toBe(current);
});

test("merge hierarchical preferences without changes", () => {
    const current = {
        pref1: 100,
        pref2: {
            pref21: "solo",
            pref22: {
                pref221: 150,
                pref222: null,
            }
        }
    };

    const [result, changed] = mergePreferences({
        pref1: () => 30 + 70,
        pref2: {
            pref22: {
                pref222: null,
            }
        }
    }, current);

    expect(changed).toEqual(false);
    expect(result).toBe(current);
    expect(result.pref1).toEqual(100);
    expect(result.pref2.pref21).toEqual("solo");
    expect(result.pref2.pref22.pref221).toEqual(150);
    expect(result.pref2.pref22.pref222).toEqual(null);
});

test("merge simple preferences with changes", () => {
    const current = {
        prop1: 10,
        prop2: "light",
        prop3: true,
        prop4: 17,
        prop5: null
    }

    const [result, changed] = mergePreferences({
        prop1: () => 50 + 15,
        prop2: "dark",
        prop5: 100
    }, current);

    expect(changed).toEqual(true);
    expect(result).not.toBe(current);
    expect(result.prop1).toEqual(65);
    expect(result.prop2).toEqual("dark");
    expect(result.prop3).toEqual(true);
    expect(result.prop4).toEqual(17);
    expect(result.prop5).toEqual(100);
});

test("merge hierarchical preferences with changes", () => {
    const current = {
        pref1: 100,
        pref2: {
            pref21: "solo",
            pref22: {
                pref221: 150,
                pref222: null,
            }
        }
    };

    const [result, changed] = mergePreferences({
        pref1: () => 100,
        pref2: {
            pref22: {
                pref221: null,
                pref222: () => split("Hello world", " ", 2),
            },
            pref23: true,
        }
    }, current);

    expect(changed).toEqual(true);
    expect(result).not.toBe(current);
    expect(result.pref1).toEqual(100);
    expect(result.pref2.pref21).toEqual("solo");
    expect(result.pref2.pref22.pref221).toEqual(null);
    expect(result.pref2.pref22.pref222).toStrictEqual(["Hello", "world"]);
    expect(result.pref2.pref23).toEqual(true);
});

test("real world preferences mocking", () => {
    const prefs = initPreferences({
        main: {
            theme: new PreferenceInit<PaletteMode>("light"),
            language: "eng"
        }
    });

    console.log(findPreferenceValue("main/theme", prefs));
});
