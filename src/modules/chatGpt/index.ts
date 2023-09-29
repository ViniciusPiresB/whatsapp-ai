import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { getOpenAiApi } from "./config/getOpenAiApi";
import { getPrompt } from "./prompts/prompt";

export default class ChatGPT {
  openAI: OpenAIApi;
  messages: { [messageFrom: string]: ChatCompletionRequestMessage[] } = {};

  constructor() {
    const openAiApi = getOpenAiApi();
    this.openAI = openAiApi;
  }

  async completion(messageContent: string, messageFrom: string) {
    await this.checkFirstMessage(messageFrom);

    const message: ChatCompletionRequestMessage = {
      role: "user",
      content: messageContent
    };

    const messages = this.setMessage(message, messageFrom);

    console.log(messages);

    const completion = await this.openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 256,
      messages
    });

    const gptResponse = completion.data.choices[0].message;

    if (!gptResponse) throw new Error("Error on chatgpt response!");

    const assistantResponse: ChatCompletionRequestMessage = {
      role: "user",
      content: gptResponse.content
    };

    this.setMessage(assistantResponse, messageFrom);
    console.log(messages);

    return gptResponse.content;
  }

  setMessage(message: ChatCompletionRequestMessage, messageFrom: string) {
    const messages = this.messages[messageFrom];

    if (!messages) this.messages[messageFrom] = [];

    this.messages[messageFrom].push(message);

    return this.messages[messageFrom];
  }

  async checkFirstMessage(messageFrom: string) {
    const messages = this.messages[messageFrom];

    if (messages) return;

    const initPrompt = await getPrompt();

    const message: ChatCompletionRequestMessage = {
      role: "system",
      content: initPrompt
    };

    this.setMessage(message, messageFrom);
  }
}
