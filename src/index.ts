import { create, Message } from "venom-bot";

(async () => {
  const venomClient = await create({ session: "test", disableWelcome: true });

  venomClient.onMessage(message => {
    if (!message.body || message.from == "status@broadcast") return;

    console.log(message.from);
    console.log(message.body);
  });
})();
