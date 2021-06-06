import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import { Prisma } from "@prisma/client";

type ContentFindArgs = Prisma.ContentFindFirstArgs | Prisma.ContentFindManyArgs | Prisma.ContentFindUniqueArgs;

@Injectable()
export class ContentRepository {
    constructor(private readonly databaseService: DatabaseService) {}
}
