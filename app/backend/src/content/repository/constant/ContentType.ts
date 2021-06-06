export const ContentType = {
    BlogEntry: "BLOG_ENTRY",
    Page: "PAGE",
} as const;
export type ContentType = typeof ContentType[keyof typeof ContentType];
