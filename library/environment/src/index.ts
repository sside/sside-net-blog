import { config } from "dotenv";
import { resolve } from "path";

const EnvironmentType = {
    Production: "production",
    Development: "development",
    Test: "test",
} as const;
type EnvironmentType = typeof EnvironmentType[keyof typeof EnvironmentType];

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
        if (!process.env) {
            throw new Error(`Cannot get environment variables.`);
        }

        this.type = this.getEnvironmentType();
        this.isProduction = this.type === EnvironmentType.Production;

        if (!this.isProduction) {
            config({
                path: resolve(__dirname, "../../../", ".env"),
                debug: true,
            });
        }
        this.variables = {
            frontend: this.getEnvironmentVariable(new FrontendEnvironmentVariable()),
            backend: this.getEnvironmentVariable(new BackendEnvironmentVariable()),
        };
    }

    private getEnvironmentType(): EnvironmentType {
        const nodeEnv = process.env.NODE_ENV;
        const environmentType = Object.values(EnvironmentType).find((environmentType) => environmentType === nodeEnv);

        if (!environmentType) {
            throw new Error(`Invalid NODE_ENV. value: ${nodeEnv}`);
        }
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
                console.warn(`Required environment variable ${key} is not defined.`);
            }
        }
        return container;
    }
}

export const environment = new Environment();
