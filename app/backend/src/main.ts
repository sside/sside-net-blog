import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { environment } from "@sside-net-blog/environment";
import { getConfiguration } from "../../../resource/configuration";
import { AppModule } from "./app.module";

const logger = new Logger("main");

const config = getConfiguration(environment.type);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const { backend: port } = config.port;
    logger.log(`Backend server launch.`);
    logger.log(`http://localhost:${port}/graphql`);
    await app.listen(port);
}
bootstrap();
