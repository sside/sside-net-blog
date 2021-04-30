export const EnvironmentType = {
    Production: "production",
    Development: "development",
    Test: "test",
} as const;
export type EnvironmentType = typeof EnvironmentType[keyof typeof EnvironmentType];
