export const UserRole = {
    Admin: "ADMIN",
    Editor: "EDITOR",
    Guest: "GUEST",
} as const;
export type UserRole = typeof UserRole[keyof typeof UserRole];
