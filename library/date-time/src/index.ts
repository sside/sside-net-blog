import { DateTime } from "luxon";
import { TimeZone } from "./constant/TimeZone";

// parser

const parseDateToJst = (date: Date): DateTime => {
    return DateTime.fromJSDate(date, { zone: TimeZone.JST });
};

const parseIsoDateTimeToJst = (isoDateTime: string): DateTime => {
    return DateTime.fromISO(isoDateTime, { zone: TimeZone.JST });
};

// comparer

export const isBefore = (target: Date, compare: Date): boolean => {
    return target.getTime() < compare.getTime();
};

export const isAfter = (target: Date, compare: Date): boolean => {
    return target.getTime() > compare.getTime();
};

export const isBetween = (target: Date, a: Date, b: Date): boolean => {
    const aEpoch = a.getTime();
    const bEpoch = b.getTime();
    const targetEpoch = target.getTime();

    if (aEpoch <= bEpoch) {
        return aEpoch <= targetEpoch && targetEpoch <= bEpoch;
    } else {
        return bEpoch <= targetEpoch && targetEpoch <= aEpoch;
    }
};

// terminator

export const fromIsoDateTimeToJst = (isoDateTime: string): Date => {
    return parseIsoDateTimeToJst(isoDateTime).toJSDate();
};

export const startOfJstDay = (date: Date): Date => {
    return parseDateToJst(date).startOf("day").toJSDate();
};

export const endOfJstDay = (date: Date): Date => {
    return parseDateToJst(date).endOf("day").toJSDate();
};
