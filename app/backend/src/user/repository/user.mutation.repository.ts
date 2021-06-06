import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import { Prisma } from "@prisma/client";
import { UserRole } from "../constant/UserRole";

@Injectable()
export class UserMutationRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async createOne(name: string, mailAddress: string, hashedPassword: string, role: UserRole) {
        return this.databaseService.user.create({
            data: {
                name,
                mailAddress,
                hashedPassword,
                role,
            },
        });
    }

    async updateOne(
        id: string,
        data: { name?: string; role?: UserRole; hashedPassword?: string; mailAddress?: string },
    ) {
        for (const key in data) {
            if (data[key] === undefined) {
                delete data[key];
            }
        }

        return this.databaseService.user.update({
            where: {
                id,
            },
            data,
        });
    }
}
