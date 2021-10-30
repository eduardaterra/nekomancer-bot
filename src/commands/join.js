import { queue } from "../index.js"

const join = async (message, serverQueue) => {

  const voiceChannel = message.member.voice.channel;

  if (voiceChannel === null) {
    return message.channel.send("you need to be connected in a voice channel to play music, boomer 😾")
  }

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send("i need the permissions to join and speak in your voice channel 😿")
  }



  try {
    var connection = await voiceChannel.join();
    serverQueue.connection = connection;
    serverQueue.voiceChannel = voiceChannel;
    queue.set(message.guild.id, serverQueue)
  } catch (err) {
    console.log(err);
    queue.delete(message.guild.id);
    return message.channel.send(err);
  }
}

export default join