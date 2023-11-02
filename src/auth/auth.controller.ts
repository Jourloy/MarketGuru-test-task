import {Body, Controller, Post, Res} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {UserDto} from "./dto/user.dto";
import {Response} from "express";

@Controller(`auth`)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post(`/register`)
	async register(@Body() userDto: UserDto, @Res() res: Response) {
		const state = await this.authService.register(userDto);
		res.status(state.errorMessage ? 400 : 200).json(state);
	}

	@Post(`/login`)
	async login(@Body() userDto: UserDto, @Res() res: Response) {
		const state = await this.authService.login(userDto);
		res.status(state.errorMessage ? 400 : 200).json(state);
	}
}
