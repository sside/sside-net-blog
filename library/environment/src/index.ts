import { EnvironmentType } from "@sside-net-blog/constant";
import { config } from "dotenv";
import { resolve } from "path";

abstract class EnvironmentVariableBase {
    [key: string]: string;

    NODE_ENV = "";
}

class FrontendEnvironmentVariable extends EnvironmentVariableBase {}

class BackendEnvironmentVariable extends EnvironmentVariableBase {
    DATABASE_URL = "";
}

/**
 * Contains environment variables.
 * Most of this class's values must not expose to public. (Ex: logging, response value, memory on frontend)
 */
class Environment {
    readonly type: EnvironmentType;
    readonly isProduction: boolean;

    readonly variables: {
        frontend: FrontendEnvironmentVariable;
        backend: BackendEnvironmentVariable;
    };

    constructor() {
        this.type = this.getEnvironmentType();
        this.isProduction = this.type === EnvironmentType.Production;

        config({
            path: resolve(__dirname, "../../../", ".env"),
            debug: !this.isProduction,
        });

        const environmentVariables = {
            frontend: this.getEnvironmentVariable(new FrontendEnvironmentVariable()),
            backend: this.getEnvironmentVariable(new BackendEnvironmentVariable()),
        };
        for (const container of Object.values(environmentVariables)) {
            Object.freeze(container);
        }
        this.variables = Object.freeze(environmentVariables);
    }

    private getEnvironmentType(): EnvironmentType {
        const nodeEnv = process.env.NODE_ENV;
        const environmentType = Object.values(EnvironmentType).find((environmentType) => environmentType === nodeEnv);

        if (!environmentType) {
            throw new Error(`Invalid NODE_ENV. value: ${nodeEnv}`);
        }

        this.logger(`Environment type: ${environmentType}`, "log");

        return environmentType;
    }

    private getEnvironmentVariable<T extends FrontendEnvironmentVariable | BackendEnvironmentVariable>(
        container: T,
    ): T {
        for (const key of Object.keys(container)) {
            const environmentVariable = process.env[key];
            if (environmentVariable) {
                // @ts-ignore
                container[key] = environmentVariable;
            } else {
                this.logger(`Required environment variable ${key} is not defined.`, "warn");
            }
        }
        return container;
    }

    private logger(message: string, type: "log" | "warn" | "error"): void {
        const formattedMessage = `[Environment] ${type}: ${message}`;
        switch (type) {
            case "error":
                console.error(formattedMessage);
                break;
            case "warn":
                console.warn(formattedMessage);
                break;
            case "log":
            default:
                console.log(formattedMessage);
                break;
        }
    }
}

export const environment = Object.freeze(new Environment());
