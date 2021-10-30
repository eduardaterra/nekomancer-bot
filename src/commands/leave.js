import { queue } from "../index.js"

const leave = async (message, serverQueue) => {
  const voiceChannel = message.member.voice.channel;

  try {
    const connection = await voiceChannel.leave()
    serverQueue.connection = connection;
    serverQueue.voiceChannel = null;
    queue.set(message.guild.id, serverQueue)
  } catch { (err) => console.log(err) }
}

export default leave;