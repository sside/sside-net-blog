import { fromIsoDateTimeToJst, isAfter, endOfJstDay, startOfJstDay, isBefore, isBetween } from "./index";

const BEGINNING_OF_2021_EPOCH_MILLI = 1609426800000;
const BEGINNING_OF_2021_ISO_DATE_TIME = "2021-01-01T00:00:00+09:00";
const NOON_OF_2021_ISO_DATE_TIME = "2021-01-01T12:00:00+09:00";

describe("date-time package", () => {
    describe("parse", () => {
        test("Can parse ISO 8601 date time", () => {
            expect(fromIsoDateTimeToJst(BEGINNING_OF_2021_ISO_DATE_TIME).getTime()).toBe(BEGINNING_OF_2021_EPOCH_MILLI);
        });
    });

    describe("manipulate", () => {
        test("Can get start of next day minus 1 millisecond", () => {
            const endOfDay = endOfJstDay(fromIsoDateTimeToJst(BEGINNING_OF_2021_ISO_DATE_TIME));
            expect(endOfDay.getTime()).toBe(BEGINNING_OF_2021_EPOCH_MILLI + 1000 * 60 * 60 * 24 - 1);
        });
    });

    describe("comparer", () => {
        const noon = fromIsoDateTimeToJst(NOON_OF_2021_ISO_DATE_TIME);
        const startOfDay = startOfJstDay(noon);
        const endOfDay = endOfJstDay(noon);
        test("Noon should be after than start of day", () => {
            expect(isAfter(noon, startOfDay)).toBeTruthy();
        });
        test("Noon should be before than end of day", () => {
            expect(isBefore(noon, endOfDay)).toBeTruthy();
        });
        test("Noon should be between of start and end of day", () => {
            expect(isBetween(noon, startOfDay, endOfDay)).toBeTruthy();
        });
        test("End of day should not be between of start and noon of day", () => {
            expect(isBefore(endOfDay, noon)).toBeFalsy();
        });
        test("Inverse between values works as non-inverse args", () => {
            expect(isBetween(noon, endOfDay, startOfDay)).toBeTruthy();
        });
    });

    describe("japanese time zone", () => {
        test("Parsed as JST", () => {
            const beginningOf2021 = fromIsoDateTimeToJst(BEGINNING_OF_2021_ISO_DATE_TIME);
            expect(beginningOf2021.getDate()).toBe(1);
            expect(beginningOf2021.getHours()).toBe(0);
        });
    });
});
