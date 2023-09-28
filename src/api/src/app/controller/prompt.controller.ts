import { Request, Response } from "express";
import { promptService } from "../service/prompt.route";

export class PromptController {
  public getPrompt(req: Request, res: Response) {
    const serviceResponse = promptService.getPrompt();

    res.status(200).send(serviceResponse);
  }

  public setPrompt(req: Request, res: Response) {
    const { prompt } = req.body;

    const serviceResponse = promptService.setPrompt(prompt);

    res.status(200).send(serviceResponse);
  }
}
