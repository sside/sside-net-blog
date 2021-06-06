import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";

@Injectable()
export class UserFindRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async findOneById(id: string) {
        return this.databaseService.user.findUnique({
            where: {
                id,
            },
        });
    }
}
