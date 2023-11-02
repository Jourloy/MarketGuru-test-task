import {Body, Controller, Post, Res} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {UserDto} from "./dto/user.dto";
import {Response} from "express";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "src/user/entities/user.entity";

@Controller(`auth`)
@ApiTags(`Auth`)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post(`/register`)
	@ApiOperation({summary: `Register new user`})
	@ApiResponse({status: 200, type: User, description: `User created`})
	@ApiResponse({status: 400, type: String, description: `User not created, look at error message`})
	async register(@Body() userDto: UserDto, @Res() res: Response) {
		const state = await this.authService.register(userDto);
		res.status(state.errorMessage ? 400 : 200).json(state);
	}

	@Post(`/login`)
	@ApiOperation({summary: `Login user`})
	@ApiResponse({status: 200, type: UserDto, description: `User logined`})
	@ApiResponse({status: 400, type: String, description: `User not logined, look at error message`})
	async login(@Body() userDto: UserDto, @Res() res: Response) {
		const state = await this.authService.login(userDto);
		res.status(state.errorMessage ? 400 : 200).json(state);
	}
}
