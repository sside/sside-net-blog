import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../../database/database.service";

@Injectable()
export class ContentHistoryFindRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async findAllByContentId(contentId: string) {
        return this.databaseService.contentHistory.findMany({
            where: {
                contentId,
            },
        });
    }
}
