import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsOptional()
	email?: string;

	@IsString()
	@IsOptional()
	phone?: string;
}
