import {Injectable} from "@nestjs/common";
import {UserDto} from "./dto/user.dto";
import {UserService} from "src/user/user.service";
import * as crypto from "crypto";
import {User} from "src/user/entities/user.entity";

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	/**
	 * Registers a user.
	 *
	 * @param {UserDto} userDTO - The user data to register.
	 * @return {Promise<any>} A promise that resolves to the created user.
	 */
	async register(userDTO: UserDto): Promise<{errorMessage?: string; user?: User}> {
		return this.userService.create(userDTO);
	}

	/**
	 * Logs in a user with the provided userDTO.
	 *
	 * @param {UserDto} userDTO - The userDTO containing the user's email and password.
	 * @return {Promise<{errorMessage?: string; user?: User}>} - A promise that resolves to an object containing an error message if login fails, or the user object if login is successful.
	 */
	async login(userDTO: UserDto): Promise<{errorMessage?: string; user?: User}> {
		const user = await this.userService.findOne(userDTO.email, userDTO.phone);

		if (!user) return {errorMessage: `User not found`};

		const password = crypto.createHash(`sha256`).update(userDTO.password).digest(`hex`);

		if (password !== user.password) return {errorMessage: `Incorrect password`};

		return {user: user};
	}
}
