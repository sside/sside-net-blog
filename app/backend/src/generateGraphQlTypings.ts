import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from "path";

const isWatch = process.argv.includes("--watch");

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
    typePaths: [join(process.cwd(), "../schema.graphql")],
    path: join(process.cwd(), "src/graphql.ts"),
    outputAs: "interface",
    customScalarTypeMapping: {
        IsoDateTime: Date,
    },
    watch: isWatch,
});
