const express = require('express');
const app = express();
const port = 3000;

// Configurar EJS como el motor de plantillas
app.set('view engine', 'ejs');

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Ruta para la vista de login
app.get('/login', (req, res) => {
  res.render('login');
});

// Ruta para el API Rest
app.get('/api', (req, res) => {
  res.json({ message: 'Hola, este es el API Rest!' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
