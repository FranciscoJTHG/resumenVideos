import { videoUrlInput, videoFileInput, submitBtn } from './utils/domElements.js';
import { showLoader, hideLoader, showResults, showError, updateStatusMessage } from './utils/display.js';
import { startVideoProcess, uploadVideoFile, checkTranscriptionResults } from './services/videoProcessor.js';

const pollTranscriptionResults = (fileName, videoUrl) => {
  const interval = setInterval(async () => {
    try {
      const statusResult = await checkTranscriptionResults(fileName);
      
      if (statusResult.status === 'PENDING') {
        showLoader();
        updateStatusMessage('El video se está procesando...');
      } else if (statusResult.status === 'COMPLETED') {
        clearInterval(interval);
        showResults(statusResult.results, videoUrl);
        hideLoader();
      } else if (statusResult.status === 'FAILED') {
        clearInterval(interval);
        showError(`La transcripción falló: ${statusResult.message}`);
        hideLoader();
      }
    } catch (error) {
      clearInterval(interval);
      console.error('Error durante el sondeo:', error);
      showError(error.message || 'Ocurrió un error al verificar el estado.');
      hideLoader();
    }
  }, 5000); // Consultar cada 5 segundos
};

submitBtn.addEventListener('click', async () => {
  const videoUrl = videoUrlInput.value;
  const videoFile = videoFileInput.files[0];

  if (!videoUrl && !videoFile) {
    showError('Por favor, ingresa una URL o selecciona un archivo MP4.');
    return;
  }

  showLoader();

  try {
    let fileName;
    let source = videoUrl;

    if (videoFile) {
      fileName = await uploadVideoFile(videoFile);
      source = videoFile.name;
    } else {
      fileName = await startVideoProcess(videoUrl);
    }

    updateStatusMessage('Video subido. Esperando transcripción...');
    pollTranscriptionResults(fileName, source);
  } catch (error) {
    console.error('Error al procesar el video:', error);
    showError(error.message || 'Ocurrió un error al procesar el video. Por favor, inténtalo de nuevo.');
    hideLoader();
  }
});
