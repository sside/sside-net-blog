import { Configuration } from "./Configuration";
import { development } from "./development";
import { production } from "./production";
import { test } from "./test";

export const getConfiguration = (): Configuration => {
    const nodeEnv = process.env.NODE_ENV;
    switch (nodeEnv) {
        case "production":
            return production;
        case "development":
            return development;
        case "test":
            return test;
        default:
            throw new Error(`Unexpected NODE_ENV. Value: ${nodeEnv}`);
    }
};
