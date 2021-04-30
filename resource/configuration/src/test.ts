import { Configuration } from "./Configuration";
import {getListenPort} from "./getListenPort";

export const test: Configuration = {
    port:getListenPort(80,8080),
};
