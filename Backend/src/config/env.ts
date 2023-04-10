if (process.env.NODE_ENV == 'production') console.log('\x1b[32m', 'EJECUTANDO EN PRODUCCIÓN', '\x1b[0m');

export const CONFIG = {
  PUERTO: process.env.NODE_PORT || '',
  DATA_BASE_MONGO: process.env.NODE_DATA_DB_MOONGO || '',
  ENTORNO: process.env.NODE_ENV || '',
  SERVER_USER_SB: process.env.NODE_SERVER_USER_SB || '',
  SERVER_PASS_SB: process.env.NODE_SERVER_PASS_SB || '',
  SERVER_SB: process.env.NODE_SERVER_SB || '',
  DATA_BASE_SB: process.env.NODE_DATA_BASE_SB || '',
};

if (process.env.NODE_ENV !== 'production') console.log('Variables del entorno:', { CONFIG });
