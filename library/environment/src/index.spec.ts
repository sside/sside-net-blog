process.env.NODE_ENV = "test";
const DATABASE_URL = "test";
process.env.DATABASE_URL = DATABASE_URL;

import { EnvironmentType } from "@sside-net-blog/constant";
import { environment } from "./index";

describe(`environment package`, () => {
    describe(`environment variable`, () => {
        test(`DATABASE_URL should be defined`, () => {
            expect(environment.variables.backend.DATABASE_URL).toBe(DATABASE_URL);
        });
    });
    describe(`environment type`, () => {
        test(`Environment type should be 'test'`, () => {
            expect(environment.type).toBe(EnvironmentType.Test);
        });
    });
    describe(`shorthand boolean`, () => {
        test(`Environment should not be production`, () => {
            expect(environment.isProduction).toBe(false);
        });
    });
});
