import { Configuration } from "./Configuration";
import { getListenPort } from "./library/getListenPort";

export const test: Configuration = {
    port: getListenPort(80, 8080),
};
