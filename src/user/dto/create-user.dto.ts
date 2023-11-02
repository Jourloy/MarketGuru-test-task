import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateUserDto {
	@ApiProperty({
		description: `The user's password`,
		example: `123456`,
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	password: string;

	@ApiProperty({
		description: `The user's email`,
		example: `jourloy@yandex.ru`,
		required: false,
	})
	@IsString()
	@IsOptional()
	email?: string;

	@ApiProperty({
		description: `The user's phone`,
		example: `88005550505`,
		required: false,
	})
	@IsString()
	@IsOptional()
	phone?: string;
}
