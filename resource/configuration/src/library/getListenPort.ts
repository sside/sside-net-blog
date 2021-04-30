import {Configuration} from "../Configuration";

export const getListenPort = (frontendFallback: number, backendFallback: number): Configuration["port"] => {
    const environmentVariables = process.env;

    const frontend = parseInt(environmentVariables.PORT!) || frontendFallback;
    const backend = parseInt(environmentVariables.BACKEND_PORT!) || backendFallback;

    return {
        frontend,
        backend,
    };
};
