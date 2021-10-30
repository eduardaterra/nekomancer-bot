const join = async (message, serverQueue) => {

  const voiceChannel = message.member.voice.channel;

  const queueContruct = {
    textChannel: message.channel,
    voiceChannel: voiceChannel,
    connection: null,
    songs: [],
    volume: 5,
    playing: true,
  };

  if (voiceChannel === null) {
    return message.channel.send("you need to be connected in a voice channel to play music, boomer 😾")
  }

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send("i need the permissions to join and speak in your voice channel 😿")
  }

  try {
    var connection = await voiceChannel.join();
    queueContruct.connection = connection;
    return message.channel.send("nekomata is in the house!!😸")
  } catch (err) {
    console.log(err);
    queue.delete(message.guild.id);
    return message.channel.send(err);
  }
}

export default join