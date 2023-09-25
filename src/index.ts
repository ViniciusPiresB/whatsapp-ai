import { create } from "venom-bot";
import ChatGPT from "./modules/chatGpt";
import { getPrompt } from "./modules/chatGpt/prompts/prompt";

(async () => {
  const venomClient = await create({ session: "test", disableWelcome: true });

  const prompt = await getPrompt();
  console.log(prompt);
  const chatGpt = new ChatGPT(prompt);

  venomClient.onMessage(async message => {
    if (
      !message.body ||
      message.from == "status@broadcast" ||
      message.isGroupMsg
    )
      return;

    console.log(message.from);
    console.log(message.content);

    const responseGpt = await chatGpt.completion(message.body);

    if (!responseGpt) return;

    venomClient.sendText(message.from, responseGpt);
  });
})();
