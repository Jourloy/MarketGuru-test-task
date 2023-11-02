import {Column, Model, Table, AllowNull, DataType} from "sequelize-typescript";

@Table
export class User extends Model {
	@Column(DataType.STRING)
	password: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	email?: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	phone?: string;
}
