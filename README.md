# First Project Node

Este proyecto es un ejemplo básico de una aplicación Node.js que incluye una vista HTML para un formulario de login y un API Rest.

## Requisitos

- Node.js (versión 12 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clona el repositorio:

   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd first-project-node
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

## Ejecución

Para iniciar el servidor, ejecuta el siguiente comando:

```sh
node app.js
```

El servidor se ejecutará en:

```
http://localhost:3000
```

## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```sh
npm test
```

## Funcionalidad del HTML

La vista HTML (login.ejs) proporciona un formulario de login simple. Los usuarios pueden ingresar su nombre de usuario y contraseña, y enviar el formulario. Los datos del formulario se manejan en el servidor y se pueden utilizar para la autenticación.

## API Rest

El API Rest proporciona un punto de acceso simple que devuelve un mensaje JSON.

```json
{
  "message": "Hola, este es el API Rest!"
}
```

## Estructura del Proyecto

```
first-project-node/
├── public/
│   └── style.css
├── views/
│   └── login.ejs
├── .gitignore
├── .prettierrc
├── app.js
├── package.json
└── [README.md](http://_vscodecontentref_/1)
```
