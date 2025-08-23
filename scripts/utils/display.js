import { loader, resultsContainer, submitBtn, summaryBox, englishBox, spanishBox, chaptersBox, statusBox, videoPlayerContainer, videoTitle, videoDescription, chaptersCount, mainContainer } from './domElements.js';

// Global variables for YouTube player
let youtubePlayer = null;
let playerReady = false;
let pendingSeek = null;

export const showLoader = () => {
  mainContainer.style.display = 'none';
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
  // No mostrar main-container aquí, ya que los resultados deben permanecer visibles
};

export const showResults = (results, videoUrl) => {
   // Reset player state for new video
   playerReady = false;
   pendingSeek = null;
   youtubePlayer = null;

   // Load YouTube IFrame Player API if not already loaded
   if (!window.YT) {
     console.log('Loading YouTube API...');
     const script = document.createElement('script');
     script.src = 'https://www.youtube.com/iframe_api';
     script.onload = () => console.log('YouTube API loaded successfully');
     script.onerror = () => console.error('Failed to load YouTube API');
     document.head.appendChild(script);
   } else {
     console.log('YouTube API already loaded');
   }

   // Clear previous content
  videoPlayerContainer.innerHTML = '';
  summaryBox.querySelector('.scrollable-content').innerHTML = '';
  englishBox.querySelector('.scrollable-content').innerHTML = '';
  spanishBox.querySelector('.scrollable-content').innerHTML = '';
  chaptersBox.querySelector('.scrollable-content').innerHTML = '';

  // Populate video player and details
  if (videoUrl && videoUrl.includes('youtube.com/watch?v=')) {
    const videoId = videoUrl.split('v=')[1].split('&')[0];
     videoPlayerContainer.innerHTML = `<div id="video-player"><iframe id="youtube-player" src="https://www.youtube.com/embed/${videoId}?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen onload="console.log('YouTube iframe loaded')"></iframe></div>`;

      // Initialize YouTube player
      if (window.YT && window.YT.Player) {
        console.log('Initializing YouTube player...');
        youtubePlayer = new window.YT.Player('youtube-player', {
          events: {
            'onReady': () => {
              playerReady = true;
              console.log('YouTube player is ready');
              // Handle any pending seek request
              if (pendingSeek !== null) {
                youtubePlayer.seekTo(pendingSeek);
                console.log(`Seeking to pending ${pendingSeek} seconds`);
                pendingSeek = null;
              }
            },
            'onError': (error) => {
              console.error('YouTube player error:', error);
            },
            'onStateChange': (event) => {
              console.log('YouTube player state changed:', event.data);
            }
          }
        });
      } else {
        console.error('YouTube API not available for player initialization');
        // Fallback: try again after a delay
        setTimeout(() => {
          if (window.YT && window.YT.Player && !youtubePlayer) {
            console.log('Retrying YouTube player initialization...');
            youtubePlayer = new window.YT.Player('youtube-player', {
              events: {
                'onReady': () => {
                  playerReady = true;
                  console.log('YouTube player is ready (retry)');
                  if (pendingSeek !== null) {
                    youtubePlayer.seekTo(pendingSeek);
                    console.log(`Seeking to pending ${pendingSeek} seconds`);
                    pendingSeek = null;
                  }
                },
                'onError': (error) => {
                  console.error('YouTube player error (retry):', error);
                }
              }
            });
          }
        }, 2000);
      }
   } else {
     videoPlayerContainer.innerHTML = `<div id="video-player"><p>No se pudo cargar el video. Asegúrate de que la URL sea válida o que el archivo se haya procesado correctamente.</p></div>`;
   }
  videoTitle.textContent = results.title || 'Título del Video';
  videoDescription.textContent = results.description || 'Descripción del video no disponible.';

  // Populate summary, English, and Spanish sections
  summaryBox.querySelector('.scrollable-content').innerHTML = `<p>${results.summary || 'No se encontró resumen.'}</p>`;
  englishBox.querySelector('.scrollable-content').innerHTML = `<p>${results.english || 'No summary found.'}</p>`;
  spanishBox.querySelector('.scrollable-content').innerHTML = `<p>${results.spanish || 'No se encontró transcripción.'}</p>`;

  // Populate chapters section
  let chaptersHtml = '';
  if (results.chapters && results.chapters.length > 0) {
    chaptersHtml += `<ul>`;
    results.chapters.forEach(chapter => {
      const timeMatch = chapter.match(/(\d+:\d+:\d+)/);
      if (timeMatch) {
        const time = timeMatch[1];
        const timeParts = time.split(':').map(Number);
        const seconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
        const chapterUrl = `${videoUrl.split('&')[0]}&t=${seconds}`;
        chaptersHtml += `<li><a href="${chapterUrl}" data-time="${seconds}">${chapter}</a></li>`;
      } else {
        chaptersHtml += `<li>${chapter}</li>`;
      }
    });
    chaptersHtml += `</ul>`;
    chaptersCount.textContent = results.chapters.length;
  } else {
    chaptersHtml = `<p class="placeholder-text">No se encontraron capítulos.</p>`;
    chaptersCount.textContent = '0';
  }
   chaptersBox.querySelector('.scrollable-content').innerHTML = chaptersHtml;

   // Add click event handler for chapters
   chaptersBox.addEventListener('click', (event) => {
     if (event.target.tagName === 'A' && event.target.hasAttribute('data-time')) {
       event.preventDefault();
       const seconds = parseInt(event.target.getAttribute('data-time'));
       // Seek to the specified time in the YouTube player
       if (playerReady && youtubePlayer && youtubePlayer.seekTo) {
         youtubePlayer.seekTo(seconds);
         console.log(`Seeking to ${seconds} seconds`);
       } else {
         // Store the seek request for when the player is ready
         pendingSeek = seconds;
         console.log(`Player not ready, queuing seek to ${seconds} seconds`);
       }
     }
   });

   mainContainer.style.display = 'none';
   resultsContainer.style.display = 'flex';
};

export const showError = (message) => {
  alert(message);
  hideLoader();
};

export const updateStatusMessage = (message) => {
  statusBox.textContent = message;
};
