import { Configuration } from "./Configuration";
import {getListenPort} from "./getListenPort";

export const production: Configuration = {
    port:getListenPort(80,8080),
};
