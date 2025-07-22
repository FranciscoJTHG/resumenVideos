const { downloadYoutubeVideo } = require('../services/youtubeService');
const { uploadVideoToS3, getLatestJsonInFolder, getLatestTextFileInFolder } = require('../services/s3Service');

const processVideo = async (req, res) => {
  const { videoUrl } = req.body;

  try {
    // 1. Descargar video de YouTube
    const { videoStream, fileName } = await downloadYoutubeVideo(videoUrl);

    // 2. Subir a S3 a la carpeta raw-videos/
    const s3Uri = await uploadVideoToS3(fileName, videoStream, 'video/mp4');
    console.log(`Video subido a S3: ${s3Uri}`);

    // 3. Responder inmediatamente con el nombre del archivo para que el frontend pueda consultarlo
    res.status(202).json({ fileName: fileName });

  } catch (error) {
    console.error('Error al procesar el video:', error);
    res.status(500).json({ message: 'Error interno del servidor al procesar el video', error: error.message });
  }
};

const getTranscriptionResults = async (req, res) => {
  const { fileName } = req.params; // Aunque no se use directamente para buscar, se mantiene para consistencia

  let mainTranscript = null;
  let chaptersData = null;
  let englishTranscript = null;
  let spanishTranscript = null;

  let allCompleted = true;

  try {
    // Intentar obtener la transcripción principal
    try {
      mainTranscript = await getLatestJsonInFolder('transcriptions/');
      console.log('Contenido de mainTranscript:', JSON.stringify(mainTranscript, null, 2));
    } catch (error) {
      if (error.name === 'NoSuchKey') allCompleted = false;
      else throw error;
    }

    // Intentar obtener los capítulos
    try {
      chaptersData = await getLatestJsonInFolder('Chapters/');
      console.log('Contenido de chaptersData:', JSON.stringify(chaptersData, null, 2));
    } catch (error) {
      if (error.name === 'NoSuchKey') allCompleted = false;
      else throw error;
    }

    // Intentar obtener la transcripción en inglés
    try {
      englishTranscript = await getLatestTextFileInFolder('outputs/', 'resumen-en', '.txt');
      console.log('Contenido de englishTranscript:', englishTranscript);
    } catch (error) {
      if (error.name === 'NoSuchKey') allCompleted = false;
      else throw error;
    }

    // Intentar obtener la transcripción en español
    try {
      spanishTranscript = await getLatestTextFileInFolder('outputs/', 'resumen-es', '.txt');
      console.log('Contenido de spanishTranscript:', spanishTranscript);
    } catch (error) {
      if (error.name === 'NoSuchKey') allCompleted = false;
      else throw error;
    }

    if (!allCompleted) {
      res.json({ status: 'PENDING' });
      return;
    }

    // Si todo está completo, construir el objeto de resultados
    const results = {
      summary: mainTranscript ? mainTranscript.results.transcripts[0].transcript : "No disponible",
      english: englishTranscript ? englishTranscript : "No disponible",
      spanish: spanishTranscript ? spanishTranscript : (mainTranscript ? mainTranscript.results.transcripts[0].transcript : "No disponible"),
      chapters: chaptersData ? chaptersData.map(c => `${c.capitulo} (${c.inicio})`) : [] // Ajustado para la nueva estructura de capítulos
    };

    res.json({ status: 'COMPLETED', results });

  } catch (error) {
    console.error('Error al obtener los resultados de la transcripción:', error);
    res.status(500).json({ message: 'Error al obtener los resultados de la transcripción', error: error.message });
  }
};

module.exports = { processVideo, getTranscriptionResults };
