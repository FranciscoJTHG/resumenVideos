const { Upload } = require('@aws-sdk/lib-storage');
const { GetObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const s3Client = require('../config/aws');

const uploadVideoToS3 = async (fileName, videoStream, contentType) => {
  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME || 'tu-nombre-de-bucket-s3', // Usar variable de entorno o placeholder
    Key: `raw-videos/${fileName}`,
    Body: videoStream,
    ContentType: contentType,
  };

  try {
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: uploadParams,
    });

    parallelUploads3.on('httpUploadProgress', (progress) => {
      console.log(progress);
    });

    await parallelUploads3.done();
    const s3Uri = `s3://${uploadParams.Bucket}/${uploadParams.Key}`;
    console.log(`Video subido a S3: ${s3Uri}`);
    return s3Uri;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });

const getTranscriptFromS3 = async (transcriptKey) => {
  const bucketName = process.env.S3_TRANSCRIPTS_BUCKET_NAME || process.env.S3_BUCKET_NAME;
  const params = {
    Bucket: bucketName,
    Key: transcriptKey,
  };

  try {
    const command = new GetObjectCommand(params);
    const { Body } = await s3Client.send(command);
    let content = await streamToString(Body);

    // Buscar el primer '[' y el último ']' para extraer solo el JSON
    const startIndex = content.indexOf('[');
    const endIndex = content.lastIndexOf(']');

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      content = content.substring(startIndex, endIndex + 1).trim();
    } else {
      console.warn(`No se encontró un array JSON en ${transcriptKey}. Contenido completo (primeros 100 chars): ${content.substring(0, 100)}...`);
      content = content.trim(); // También trim aquí por si acaso
    }
    console.log(`Contenido a parsear para ${transcriptKey}:`, content.substring(0, 200) + '...'); // Log para depuración
    return JSON.parse(content);
  } catch (error) {
    console.error("Error al obtener la transcripción de S3:", error);
    throw error;
  }
};

const getRawJsonFromS3 = async (key) => {
  const bucketName = process.env.S3_TRANSCRIPTS_BUCKET_NAME || process.env.S3_BUCKET_NAME;
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const command = new GetObjectCommand(params);
    const { Body } = await s3Client.send(command);
    const content = await streamToString(Body);
    console.log(`Contenido RAW JSON para ${key}:`, content.substring(0, 200) + '...'); // Log para depuración
    return JSON.parse(content);
  } catch (error) {
    console.error("Error al obtener JSON RAW de S3:", error);
    throw error;
  }
};

const getTextFromS3 = async (key) => {
  const bucketName = process.env.S3_TRANSCRIPTS_BUCKET_NAME || process.env.S3_BUCKET_NAME;
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const command = new GetObjectCommand(params);
    const { Body } = await s3Client.send(command);
    return await streamToString(Body);
  } catch (error) {
    console.error("Error al obtener texto de S3:", error);
    throw error;
  }
};

const getLatestJsonInFolder = async (folderPath, suffix = '.json') => {
  const bucketName = process.env.S3_TRANSCRIPTS_BUCKET_NAME || process.env.S3_BUCKET_NAME;
  const listParams = {
    Bucket: bucketName,
    Prefix: folderPath,
  };

  try {
    const command = new ListObjectsV2Command(listParams);
    const { Contents } = await s3Client.send(command);

    if (!Contents || Contents.length === 0) {
      const noSuchKeyError = new Error('NoSuchKey');
      noSuchKeyError.name = 'NoSuchKey';
      throw noSuchKeyError;
    }

    const jsonFiles = Contents.filter(item => item.Key.endsWith(suffix));

    if (jsonFiles.length === 0) {
      const noSuchKeyError = new Error('NoSuchKey');
      noSuchKeyError.name = 'NoSuchKey';
      throw noSuchKeyError;
    }

    // Ordenar por fecha de última modificación (más reciente primero)
    jsonFiles.sort((a, b) => b.LastModified.getTime() - a.LastModified.getTime());

    const latestFileKey = jsonFiles[0].Key;
    console.log(`Latest JSON file in ${folderPath} with suffix ${suffix}: ${latestFileKey}`);

    // Decidir qué función de lectura usar basada en la carpeta
    if (folderPath === 'transcriptions/') {
      return await getRawJsonFromS3(latestFileKey);
    } else {
      return await getTranscriptFromS3(latestFileKey);
    }

  } catch (error) {
    // Si no se encuentra la clave, se propaga el error para que videoController lo maneje como PENDING
    if (error.name === 'NoSuchKey') {
      throw error;
    }
    console.error(`Error al listar o obtener el JSON más reciente en ${folderPath}:`, error);
    throw error;
  }
};

const getLatestTextFileInFolder = async (folderPath, filePrefix, suffix = '.txt') => {
  const bucketName = process.env.S3_TRANSCRIPTS_BUCKET_NAME || process.env.S3_BUCKET_NAME;
  const listParams = {
    Bucket: bucketName,
    Prefix: folderPath,
  };

  const command = new ListObjectsV2Command(listParams);
  const { Contents } = await s3Client.send(command);

  if (!Contents || Contents.length === 0) {
    const noSuchKeyError = new Error('NoSuchKey');
    noSuchKeyError.name = 'NoSuchKey';
    throw noSuchKeyError;
  }

  const textFiles = Contents.filter(item => 
    item.Key.includes(filePrefix)
    && item.Key.endsWith(suffix)
  );

  if (textFiles.length === 0) {
    const noSuchKeyError = new Error('NoSuchKey');
    noSuchKeyError.name = 'NoSuchKey';
    throw noSuchKeyError;
  }

  // Ordenar por el timestamp en el nombre del archivo
  textFiles.sort((a, b) => {
    const timestampA = a.Key.match(/(\d{8}T\d{6}Z)/);
    const timestampB = b.Key.match(/(\d{8}T\d{6}Z)/);
    if (timestampA && timestampB) {
      return timestampB[1].localeCompare(timestampA[1]);
    }
    return 0;
  });

  const latestFileKey = textFiles[0].Key;
  return await getTextFromS3(latestFileKey);
};

module.exports = { uploadVideoToS3, getTranscriptFromS3, getLatestJsonInFolder, getTextFromS3, getLatestTextFileInFolder, getRawJsonFromS3 };
