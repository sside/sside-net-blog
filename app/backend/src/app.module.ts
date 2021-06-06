import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { environment } from "@sside-net-blog/environment";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { join } from "path";
import { ScalarModule } from "./scalar/scalar.module";
import { ContentModule } from "./content/content.module";
import { UserModule } from "./user/user.module";
import { MetaTagModule } from "./meta-tag/meta-tag.module";

@Module({
    imports: [
        GraphQLModule.forRoot({
            typePaths: [join(process.cwd(), "../schema.graphql")],
            playground: true,
            debug: !environment.isProduction,
        }),
        DatabaseModule,
        ScalarModule,
        ContentModule,
        UserModule,
        MetaTagModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
