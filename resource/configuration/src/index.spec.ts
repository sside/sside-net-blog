import { Configuration } from "./Configuration";
import { getConfiguration } from "./index";
import { production } from "./production";

describe("environment package", () => {
    test("Can get production setting values", () => {
        process.env.NODE_ENV = "production";
        expect(getConfiguration()).toEqual<Configuration>(production);
    });

    test("Throws error when environment value is not proper", () => {
        process.env.NODE_ENV = "not_defined";
        expect(getConfiguration()).toThrowError();
    });
});
