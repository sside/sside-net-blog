import { EnvironmentType } from "@sside-net-blog/constant";
import { Configuration } from "./Configuration";
import { getConfiguration } from "./index";
import { production } from "./production";

describe("environment package", () => {
    test("Can get production setting values", () => {
        process.env.NODE_ENV = "production";
        expect(getConfiguration(process.env.NODE_ENV as EnvironmentType)).toEqual<Configuration>(production);
    });

    test("Throws error when environment value is not proper", () => {
        expect(() => {
            getConfiguration("unexpected" as EnvironmentType);
        }).toThrowError();
    });
});
