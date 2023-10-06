const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'DiseñoBaseDeDatos',
  password: 'admin123',
  port: 9000,
});

module.exports = pool;