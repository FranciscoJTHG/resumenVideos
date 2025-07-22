const ytdl = require('ytdl-core');

const downloadYoutubeVideo = async (videoUrl) => {
  if (!ytdl.validateURL(videoUrl)) {
    throw new Error('URL de YouTube inválida');
  }

  console.log(`Descargando video de YouTube: ${videoUrl}`);
  const videoStream = ytdl(videoUrl, {
    quality: 'highestvideo', // Descarga la mejor calidad de video
    filter: 'audioandvideo', // Asegura que tenga audio y video
  });

  const info = await ytdl.getInfo(videoUrl);
  const videoTitle = info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `${videoTitle}-${Date.now()}.mp4`;

  return { videoStream, fileName, contentType: 'video/mp4' };
};

module.exports = { downloadYoutubeVideo };
