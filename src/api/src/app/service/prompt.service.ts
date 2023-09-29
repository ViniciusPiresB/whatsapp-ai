import * as fs from "fs";

export class promptService {
  public static getPrompt() {
    const prompt = fs.readFileSync("./src/prompt.txt", "utf-8");

    return { prompt };
  }

  public static setPrompt(prompt: string) {
    fs.writeFileSync("./src/prompt.txt", prompt);

    return { message: "success" };
  }
}
