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

export const showResults = (results) => {
  summaryBox.innerHTML = `<h2>Resumen</h2><p>${results.summary}</p>`;
  englishBox.innerHTML = `<h2>English</h2><p>${results.english}</p>`;
  spanishBox.innerHTML = `<h2>Español</h2><p>${results.spanish}</p>`;
  
  let chaptersHtml = `<h2>Capítulos</h2><ul>`;
  results.chapters.forEach(chapter => {
    chaptersHtml += `<li>${chapter}</li>`;
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
