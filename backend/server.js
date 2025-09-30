// server.js
import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();

// Cambia el puerto según la variable de entorno o usa un default
const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  
});
