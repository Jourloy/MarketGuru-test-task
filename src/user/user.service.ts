import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "./entities/user.entity";
import {InjectModel} from "@nestjs/sequelize";
import * as crypto from "crypto";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User)
		private userModel: typeof User
	) {}

	/**
	 * Creates a new user with the provided data.
	 *
	 * @param {CreateUserDto} createUserDto - The data of the user to be created.
	 * @return {Promise<{errorMessage: string} | {user: User}>} - Returns an object with an error message if the user already exists or with the created user.
	 */
	public async create(createUserDto: CreateUserDto): Promise<{errorMessage?: string, user?: User}> {
		if (!createUserDto.email && !createUserDto.phone) {
			return {errorMessage: `Email or phone is required`};
		}

		const whereQuery = {};
		if (createUserDto.email) whereQuery[`email`] = createUserDto.email;
		if (createUserDto.phone) whereQuery[`phone`] = createUserDto.phone;

		const _user = await this.userModel.findOne({where: {...whereQuery}});
		if (_user) {
			return {errorMessage: `User already exists`};
		}

		const user = await this.userModel.create({
			...createUserDto,
			password: crypto.createHash(`sha256`).update(createUserDto.password).digest(`hex`),
		});

		return {user: user};
	}

	/**
	 * Finds all users with an optional limit and page number.
	 *
	 * @param {number} limit - The maximum number of users to retrieve. Default is 10.
	 * @param {number} page - The page number to retrieve. If provided, the limit will be applied.
	 * @return {Promise<User[]>} - A promise that resolves to an array of User objects.
	 */
	public async findAll(limit: number = 10, page?: number): Promise<User[]> {
		const users = await this.userModel.findAll({
			limit,
			offset: page ? (page - 1) * limit : 0,
		});
		return users;
	}

	public async findOne(email?: string, phone?: string): Promise<User> {
		const whereQuery = {};
		if (email) whereQuery[`email`] = email;
		if (phone) whereQuery[`phone`] = phone;

		return this.userModel.findOne({where: {...whereQuery}});
	}
}
