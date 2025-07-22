const backendUrl = 'http://localhost:3000';

export const startVideoProcess = async (url) => {
  const response = await fetch(`${backendUrl}/process-video`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ videoUrl: url }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al iniciar el proceso en el backend');
  }

  const data = await response.json();
  return data.fileName; // Devuelve el nombre del archivo
};

export const checkTranscriptionResults = async (fileName) => {
  const response = await fetch(`${backendUrl}/results/${fileName}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al consultar los resultados de la transcripción');
  }

  return response.json(); // Devuelve el estado actual { status, results? }
};
