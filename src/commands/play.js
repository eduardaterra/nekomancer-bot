import ytdl from "ytdl-core"
import { queue } from "../index.js"


const play = async (message, guild) => {
  const serverQueue = queue.get(guild.id);
  const args = message.content.split(" ");
  let url;

  if (args[1] === "drama") {
    url = "https://www.youtube.com/watch?v=4MpCPlmOJ7s&list=PLdtemqOSucptx6uw8rrCtNTHWWF8oBkC2&index=2"
  }
  if (args[1] === "dark") {
    url = "https://www.youtube.com/watch?v=qp8rpYetgpI&list=PLdtemqOSucptx6uw8rrCtNTHWWF8oBkC2&index=5m/watch?v=fW14Pb4yShg&list=PLdtemqOSucptx6uw8rrCtNTHWWF8oBkC2&index=3&ab_channel=DimitriDeAlencar"
  }
  if (args[1] === "classic-villain") {
    url = "https://www.youtube.com/watch?v=XCBwOgTYFAI&list=PLdtemqOSucptx6uw8rrCtNTHWWF8oBkC2&index=7&ab_channel=ultravclet"
  }
  if (args[1] === "epic-villain") {
    url = "https://www.youtube.com/watch?v=07nRu4xjUTw&ab_channel=GloriaeTemplum"
  }
  if (args[1] === "combat") {
    url = "https://www.youtube.com/watch?v=lAGm9MTyRJ8&ab_channel=ChrisThePlayer"
  }
  if (args[1] === "epic-combat") {
    url = "https://www.youtube.com/watch?v=CGGKL2OcqL4&list=PLdtemqOSucptx6uw8rrCtNTHWWF8oBkC2&index=5&ab_channel=GianniRusso"
  }
  if (args[1] === "dramatic-combat") {
    url = "https://www.youtube.com/watch?v=Zzk_iliicAo&ab_channel=EpicMusicWorld"
  }
  if (args[1] === "tragic") {
    url = "https://www.youtube.com/watch?v=eE8bk8NJqbE&ab_channel=GloriaeTemplum"
  }
  if (args[1] === "adventure") {
    url = "https://www.youtube.com/watch?v=LzONfhz-1vo&t=114s&ab_channel=Tubjess"
  }
  if (args[1] === "escape") {
    url = "https://www.youtube.com/watch?v=_j8jUUzGqDo&ab_channel=TheSeventhMidnight"
  }
  if (args[1] === "prison") {
    url = "https://www.youtube.com/watch?v=FVmWdIwjgKA&ab_channel=MichaelGhelfi-RPGAudio"
  }
  if (arg[1] === "triumph") {
    url = "https://www.youtube.com/watch?v=uz_sxVDuCV8&ab_channel=GloriaeTemplum"
  }
  if (arg[1] === "negociation") {
    url = "https://www.youtube.com/watch?v=YjVMd8YxEic&list=PLdtemqOSucptx6uw8rrCtNTHWWF8oBkC2&index=18&ab_channel=Sirberus"
  }

  const songInfo = await ytdl.getInfo(url)
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url
  }

  const dispatcher = serverQueue.connection.play(ytdl(song.url)).on("finish", () => ytdl(song.url))
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Now Playing: ${song.title} 🎧😽`)

}

export default play