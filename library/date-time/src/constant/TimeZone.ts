export const TimeZone = {
    JST: "Asia/Tokyo",
} as const;
export type TimeZone = typeof TimeZone[keyof typeof TimeZone];
