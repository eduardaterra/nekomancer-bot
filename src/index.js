import Discord from "discord.js";
import * as data from "./config.json";
import dotenv from "dotenv";
import join from "./commands/join.js";

dotenv.config()

export const config = data.default.config

const queue = new Map()

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

export const message = client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  const serverQueue = queue.get(message.guild.id);
  if (message.content.startsWith(`${config.prefix}join`)) {
    join(message, serverQueue);
  }
});

