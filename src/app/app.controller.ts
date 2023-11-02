import {Controller, Get, Res} from "@nestjs/common";
import {AppService} from "./app.service";
import { Response } from "express";
import { ApiResponse } from "@nestjs/swagger";

@Controller(``)
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get(`/live`)
	@ApiResponse({status: 200, description: `Live check of server`})
	public live(@Res() res: Response) {
		res.status(200).json({status: `ok`});
	}
}
