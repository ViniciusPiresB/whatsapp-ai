import * as dotenv from "dotenv";
dotenv.config();

export const getPrompt = async () => {
  const baseURL = process.env.API_URL;

  const request = await fetch(`${baseURL}/prompt`);

  if (request.status != 200) throw new Error("Error on getPrompt request");

  const response = await request.json();

  const prompt: string = response.prompt;

  return prompt;
};
