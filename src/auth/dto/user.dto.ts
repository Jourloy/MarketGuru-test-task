import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UserDto {
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
