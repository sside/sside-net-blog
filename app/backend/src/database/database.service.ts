import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super();
    }

    async onModuleDestroy(): Promise<void> {
        await this.$connect();
    }

    async onModuleInit(): Promise<void> {
        await this.$disconnect();
    }
}
