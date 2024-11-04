const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configurar EJS como el motor de plantillas
app.set('view engine', 'ejs');

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para la vista de login
app.get('/login', (req, res) => {
  res.render('login');
});

// Ruta para manejar el formulario de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Aquí puedes agregar la lógica de autenticación
  res.send(`Usuario: ${username}, Contraseña: ${password}`);
});

// Ruta para el API Rest
app.get('/api', (req, res) => {
  res.json({ message: 'Hola, este es el API Rest!' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
