import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import helmet from "helmet";
import pkg from "../package.json";
import cookieParser from "cookie-parser";
import {Logger, ValidationPipe} from "@nestjs/common";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`dotenv`).config();

async function bootstrap() {
	const logger = new Logger(`App`);
	const app = await NestFactory.create(AppModule);

	// Some things

	app.use(cookieParser());

	// Swagger

	const config = new DocumentBuilder()
		.setTitle(`MarketGuru Test`)
		.setDescription(`Backend example`)
		.setVersion(pkg.version)
		.build();
	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup(`api`, app, document);

	// Defence

	const corsUrls =
		process.env.DEPLOYMENT_MODE === `local`
			? [`http://localhost:${process.env.FRONTEND_PORT}`]
			: [`https://jourloy.${process.env.DOMAIN_NAME}`];

	app.enableCors({
		origin: corsUrls,
		credentials: true,
	});
	app.use(helmet());
	app.useGlobalPipes(new ValidationPipe());

	logger.log(`App is running on port ${process.env.PORT || 10001}`);

	await app.listen(3000, `0.0.0.0`);
}

bootstrap().then();
