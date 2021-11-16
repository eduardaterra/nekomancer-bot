import { queue } from "../index.js"

const join = async (message, queueContract) => {

  const voiceChannel = message.member.voice.channel;

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send("i need the permissions to join and speak in your voice channel 😿")
  }

  try {
    var connection = await voiceChannel.join();
    queueContract.connection = connection;
    queueContract.voiceChannel = voiceChannel;
    queue.set(message.guild.id, queueContract);
  } catch (err) {
    console.log(err);
    queue.delete(message.guild.id);
    return message.channel.send(err);
  }
}

export default join