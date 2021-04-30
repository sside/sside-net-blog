import { Configuration } from "./Configuration";
import {getListenPort} from "./library/getListenPort";

export const development: Configuration = {
    port:getListenPort(80,8080),
};
