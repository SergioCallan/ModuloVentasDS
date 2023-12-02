const fs = require('fs');

const path = 'errorlog.txt';

function logError(error) {
  const timestamp = new Date().toISOString();
  const errorMessage = `[${timestamp}] Error: ${error.message}\n`;

  // Agregar el mensaje al archivo de registro
  fs.appendFileSync(path, errorMessage);

  // También puedes imprimir el error en la consola para propósitos de desarrollo
  console.error(error);
}

module.exports = logError;