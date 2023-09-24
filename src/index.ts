import { create, Message } from "venom-bot";

const venomClient = await create({
  session: "test",
  disableWelcome: true
});

venomClient.onMessage(message => {
  if (!message.body || message.isGroupMsg || message.from == "status@broadcast")
    return;

  console.log(message.body);
});
