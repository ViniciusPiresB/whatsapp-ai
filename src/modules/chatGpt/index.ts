import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { getOpenAiApi } from "./config/getOpenAiApi";

export default class ChatGPT {
  openAI: OpenAIApi;
  messages: ChatCompletionRequestMessage[] = [];

  constructor(startPrompt: string) {
    const openAiApi = getOpenAiApi();

    const message: ChatCompletionRequestMessage = {
      role: "system",
      content: startPrompt
    };

    this.openAI = openAiApi;
    this.setMessage(message);
  }

  async completion(messageContent: string) {
    const message: ChatCompletionRequestMessage = {
      role: "user",
      content: messageContent
    };

    const messages = this.setMessage(message);

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

    this.setMessage(assistantResponse);
    console.log(messages);

    return gptResponse.content;
  }

  setMessage(message: ChatCompletionRequestMessage) {
    this.messages.push(message);

    return this.messages;
  }
}
