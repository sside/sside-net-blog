import { EnvironmentType } from "@sside-net-blog/constant";
import { Configuration } from "./Configuration";
import { development } from "./development";
import { production } from "./production";
import { test } from "./test";

export const getConfiguration = (environmentType: EnvironmentType): Configuration => {
    switch (environmentType) {
        case "production":
            return production;
        case "development":
            return development;
        case "test":
            return test;
        default:
            throw new Error(`Unexpected NODE_ENV. Value: ${environmentType}`);
    }
};
