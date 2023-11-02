import {Injectable} from "@nestjs/common";
import {UserDto} from "./dto/user.dto";
import {UserService} from "src/user/user.service";
import * as crypto from "crypto";
import {User} from "src/user/entities/user.entity";

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async register(userDTO: UserDto) {
		return this.userService.create(userDTO);
	}

	async login(userDTO: UserDto): Promise<{errorMessage?: string; user?: User}> {
		const user = await this.userService.findOne(userDTO.email, userDTO.phone);

		if (!user) return {errorMessage: `User not found`};

		const password = crypto.createHash(`sha256`).update(userDTO.password).digest(`hex`);

		if (password !== user.password) return {errorMessage: `Incorrect password`};

		return {user: user};
	}
}
