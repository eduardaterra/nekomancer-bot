import Discord from "discord.js";
import * as data from "./config.json";
import dotenv from "dotenv";
import join from "./commands/join.js";
import leave from "./commands/leave.js"

dotenv.config()

export const config = data.default.config

export const queue = new Map()

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

client.once("ready", () => { console.log("ready!") })

client.once("reconnecting", () => {
  console.log("reconnecting"
  )
})
client.once("disconnect", () => {
  console.log("disconnect")
})

let botIsActive = false;

export const message = client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  const queueContract = {
    textChannel: message.channel,
    voiceChannel: null,
    connection: null,
    songs: [],
    volume: 5,
    playing: true,
  };
  queue.set(message.guild.id, queueContract);

  const serverQueue = queue.get(message.guild.id);

  setTimeout(() => leave(message, serverQueue), 60000 * 120);

  if (message.content.startsWith(`${config.prefix}join`)) {
    join(message, serverQueue, botIsActive);
    if (botIsActive === true) {
      message.channel.send("i'm already in! 😾")
    } else {
      message.channel.send("nekomancer is in the house!! ☠️☠️ 😸 ☠️☠️");
      botIsActive = true;
    }
  }
  if (message.content.startsWith(`${config.prefix}leave`)) {
    leave(message, serverQueue);
    if (botIsActive === false) {
      message.channel.send("i'm already out! 😾")
    } else {
      message.channel.send("bye bye 😽");
      botIsActive = false;
    }
  }

});

