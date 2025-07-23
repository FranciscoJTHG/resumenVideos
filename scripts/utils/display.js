import { loader, resultsContainer, submitBtn, summaryBox, englishBox, spanishBox, chaptersBox, statusBox } from './domElements.js';

export const showLoader = () => {
  resultsContainer.style.display = 'none';
  statusBox.textContent = ''; // Limpiar mensajes de estado anteriores
  statusBox.style.display = 'block';
  loader.style.display = 'block';
  submitBtn.textContent = 'Procesando...';
  submitBtn.disabled = true;
};

export const hideLoader = () => {
  loader.style.display = 'none';
  statusBox.style.display = 'none';
  submitBtn.textContent = 'Procesar';
  submitBtn.disabled = false;
};

export const showResults = (results, videoUrl) => {
  summaryBox.innerHTML = `<h2>Transcripción</h2><p>${results.summary}</p>`;
  englishBox.innerHTML = `<h2>Resumen en Inglés</h2><p>${results.english}</p>`;
  spanishBox.innerHTML = `<h2>Resumen en Español</h2><p>${results.spanish}</p>`;
  
  let chaptersHtml = `<h2>Capítulos</h2><ul>`;
  results.chapters.forEach(chapter => {
    const timeMatch = chapter.match(/(\d+:\d+:\d+)/);
    if (timeMatch) {
      const time = timeMatch[1];
      const timeParts = time.split(':').map(Number);
      const seconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
      const chapterUrl = `${videoUrl.split('&')[0]}&t=${seconds}`;
      chaptersHtml += `<li><a href="${chapterUrl}" target="_blank">${chapter}</a></li>`;
    } else {
      chaptersHtml += `<li>${chapter}</li>`;
    }
  });
  chaptersHtml += `</ul>`;
  chaptersBox.innerHTML = chaptersHtml;

  resultsContainer.style.display = 'flex';
};

export const showError = (message) => {
  alert(message);
  hideLoader();
};

export const updateStatusMessage = (message) => {
  statusBox.textContent = message;
};
