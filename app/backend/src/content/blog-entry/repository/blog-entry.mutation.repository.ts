import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "../../../database/database.service";
import { ContentType } from "../../repository/constant/ContentType";
import { BlogEntryFindRepository } from "./blog-entry.find.repository";

@Injectable()
export class BlogEntryMutationRepository {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly blogEntryFindRepository: BlogEntryFindRepository,
    ) {}

    async createOne(
        userId: string,
        metaTagIds: string[],
        title: string,
        bodyMarkdown: string,
        slug: string,
        isPublished: boolean,
    ) {
        const data: Prisma.ContentCreateInput = {
            contentType: ContentType.BlogEntry,
            slug,
            User: {
                connect: {
                    id: userId,
                },
            },
            metaTags: {
                connect: metaTagIds.map((metaTagId) => {
                    return {
                        id: metaTagId,
                    };
                }),
            },
            contentHistories: {
                create: {
                    bodyMarkdown,
                    title,
                    isPublished,
                },
            },
        };

        return this.databaseService.content.create({
            data,
        });
    }

    async updateOne(
        id: string,
        metaTagIds: string[],
        title: string,
        bodyMarkdown: string,
        slug: string,
        isPublished: boolean,
    ) {
        const exist = await this.databaseService.content.findUnique({
            where: {
                id,
            },
            include: {
                metaTags: true,
                contentHistories: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });

        if (!exist) {
            throw new NotFoundException(`Blog entry not found. id: ${id}`);
        }

        await this.databaseService.content.update({
            where: {
                id: exist.id,
            },
            data: {
                slug,
                metaTags: {
                    connect: metaTagIds.map((metaTag) => {
                        return {
                            id: metaTag,
                        };
                    }),
                },
            },
        });

        const latestContentHistory = exist.contentHistories[exist.contentHistories.length - 1];
        if (latestContentHistory?.isPublished) {
            await this.databaseService.contentHistory.update({
                where: {
                    id: latestContentHistory.id,
                },
                data: {
                    title,
                    bodyMarkdown,
                    isPublished,
                },
            });
        } else {
            await this.databaseService.contentHistory.create({
                data: {
                    title,
                    bodyMarkdown,
                    isPublished,
                    contentId: exist.id,
                },
            });
        }

        return this.blogEntryFindRepository.findOneById(id);
    }
}
