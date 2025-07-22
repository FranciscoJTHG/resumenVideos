import { videoUrlInput, submitBtn } from './utils/domElements.js';
import { showLoader, hideLoader, showResults, showError, updateStatusMessage } from './utils/display.js';
import { startVideoProcess, checkTranscriptionResults } from './services/videoProcessor.js';

const pollTranscriptionResults = (fileName) => {
  const interval = setInterval(async () => {
    try {
      const statusResult = await checkTranscriptionResults(fileName);
      updateStatusMessage(`Estado: ${statusResult.status}`);

      if (statusResult.status === 'COMPLETED') {
        clearInterval(interval);
        showResults(statusResult.results);
        hideLoader();
      } else if (statusResult.status === 'FAILED') {
        clearInterval(interval);
        showError(`La transcripción falló: ${statusResult.message}`);
        hideLoader();
      }
      // Si está en progreso, no hacemos nada y el polling continúa

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

  if (!videoUrl) {
    showError('Por favor ingresa una URL válida');
    return;
  }

  showLoader();

  try {
    const fileName = await startVideoProcess(videoUrl);
    updateStatusMessage('Video subido. Esperando transcripción...');
    pollTranscriptionResults(fileName);
  } catch (error) {
    console.error('Error al procesar el video:', error);
    showError(error.message || 'Ocurrió un error al procesar el video. Por favor, inténtalo de nuevo.');
    hideLoader();
  }
});
