import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../../database/database.service";
import { ContentType } from "../../repository/constant/ContentType";

@Injectable()
export class BlogEntryFindRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async findOneById(id: string) {
        const blogEntry = await this.databaseService.content.findUnique({
            where: {
                id,
            },
        });
        if (!blogEntry || blogEntry.contentType !== ContentType.BlogEntry) {
            throw new NotFoundException();
        }
        return blogEntry;
    }

    async findOneBySlug(slug: string) {
        const blogEntry = await this.databaseService.content.findUnique({
            where: {
                slug,
            },
        });
        if (!blogEntry || blogEntry.contentType !== ContentType.BlogEntry) {
            throw new NotFoundException();
        }
        return blogEntry;
    }

    async findManyLatestPublished(limit: number) {
        return this.databaseService.content.findMany({
            include: {
                contentHistories: {
                    where: {
                        isPublished: true,
                    },
                },
            },
            where: {
                contentType: ContentType.BlogEntry,
            },
            orderBy: {
                publishedAt: "desc",
            },
            take: limit,
        });
    }
}
