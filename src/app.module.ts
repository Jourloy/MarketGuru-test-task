import {Module} from "@nestjs/common";
import {AppController} from "./app/app.controller";
import {AppService} from "./app/app.service";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user/entities/user.entity";

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: `postgres`,
			host: `postgres`,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [User],
			autoLoadModels: true,
		}),
		UserModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
