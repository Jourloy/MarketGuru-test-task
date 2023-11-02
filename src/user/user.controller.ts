import {Controller, Get, Post, Body, Res, Query} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {Response} from "express";
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./entities/user.entity";

@Controller(`user`)
@ApiTags(`User`)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post(`/`)
	@ApiOperation({summary: `Create user, similar to POST /auth/register`})
	@ApiResponse({status: 200, type: User, description: `User created`})
	@ApiResponse({status: 400, type: String, description: `User not created, look at error message`})
	async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
		const state = await this.userService.create(createUserDto);
		res.status(state.errorMessage ? 400 : 200).json(state);
	}

	@Get(`/`)
	@ApiOperation({summary: `Return list of all users`})
	@ApiResponse({status: 200, type: [User], description: `List of users`})
	@ApiQuery({name: `limit`, type: Number, required: false, description: `Limit of users. Default is 10`})
	@ApiQuery({name: `page`, type: Number, required: false, description: `Page number`})
	async findAll(@Query() query: {limit?: string; page?: string}) {
		return this.userService.findAll(+query.limit || null, +query.page || null);
	}

	/*
	 * How to improve:
	 *
	 * 1. Add role guard. Create and get all can only admin.
	 * 2. Add @Patch and @Delete.
	 */
}
