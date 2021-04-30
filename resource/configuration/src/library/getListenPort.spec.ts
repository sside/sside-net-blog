import { Configuration } from "../Configuration";
import { getListenPort } from "./getListenPort";

describe("getListenPort", () => {
    test("Can get fallback value", () => {
        const FRONTEND_PORT = 80;
        const BACKEND_PORT = 8080;

        const expectedValue: Configuration["port"] = {
            frontend: FRONTEND_PORT,
            backend: BACKEND_PORT,
        };

        expect(getListenPort(FRONTEND_PORT, BACKEND_PORT)).toEqual(expectedValue);
    });

    test("Can get environment variable value", () => {
        const FRONTEND_PORT = 8080;
        const BACKEND_PORT = 8081;

        process.env.PORT = FRONTEND_PORT.toString();
        process.env.BACKEND_PORT = BACKEND_PORT.toString();

        const expectedValue: Configuration["port"] = {
            frontend: FRONTEND_PORT,
            backend: BACKEND_PORT,
        };

        expect(getListenPort(FRONTEND_PORT - 1, BACKEND_PORT - 1)).toEqual(expectedValue);
    });
});
