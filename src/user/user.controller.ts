import {Controller, Get, Post, Body, Res, Query} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import { Response } from "express";

@Controller(`user`)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post(`/`)
	async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
		const state = await this.userService.create(createUserDto);
		res.status(state.errorMessage ? 400 : 200).json(state);
	}

	@Get(`/`)
	async findAll(@Query() query: {limit?: string, page?: string}) {
		return this.userService.findAll(+query.limit || null, +query.page || null);
	}

	/*
	 * How to improve:
	 * 
	 * 1. Add role guard. Create and get all can only admin.
	 * 2. Add @Patch and @Delete.
	 */
}
