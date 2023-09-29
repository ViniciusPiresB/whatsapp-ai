import { create } from "venom-bot";
import ChatGPT from "./modules/chatGpt";
import { getPrompt } from "./modules/chatGpt/prompts/prompt";
import { updateSettings } from "./helper/updateSettings";
import { getSettings } from "./helper/getSettings";

(async () => {
  const venomClient = await create({
    session: "test",
    disableWelcome: true
  });

  const settings = await getSettings();

  const canAnswerGroup = settings.canAnswerGroup;

  const chatGpt = new ChatGPT();

  venomClient.onMessage(async (message) => {
    const start = performance.now();

    if (!message.body || message.from == "status@broadcast") return;

    if (message.from == "556292342844@c.us") return;

    if (!canAnswerGroup) {
      if (message.isGroupMsg) return;
    }

    const responseGpt = await chatGpt.completion(message.body, message.from);

    if (!responseGpt) return;

    venomClient.sendText(message.from, responseGpt);

    const stop = performance.now();
    const inSeconds = Number(Number((stop - start) / 1000).toFixed(2));

    updateSettings(inSeconds);
  });
})();
