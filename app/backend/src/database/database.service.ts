import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient, Prisma } from "@prisma/client";
import { environment } from "@sside-net-blog/environment";

const productionLogLevel: Prisma.LogLevel[] = ["info", `warn`, "error"];
const developmentLogLevel: Prisma.LogLevel[] = [...productionLogLevel, "query"];

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log: environment.isProduction ? productionLogLevel : developmentLogLevel,
        });
    }

    async onModuleDestroy(): Promise<void> {
        await this.$connect();
    }

    async onModuleInit(): Promise<void> {
        await this.$disconnect();
    }
}
