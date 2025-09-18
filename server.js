// Configuraciones de Express basica
const express = require("express");
const app = express();
const PORT = 4000;
const RouterProductos = require("./routes/productos");


const logger = (req, res, next) => {
  console.log(
    `Ruta recibida: ${req.method} ${req.url} - ${new Date().toISOString()}`
  );
  next();
};
// Middleware: Son una funcion que va a intervenir entre la http.req y la http.res

app.use(express.json()); // Permite recibir datos en formato json

app.use(logger); // Aplica el middleware a todas las rutas

// Se crean las rutas con express
// req = request, res = response
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hola mundo desde express",
    endpoint: [
      {
        method: "GET",
        url: "/api/productos",
      },
      {
        method: "POST",
        url: "/api/productos",
      },
    ],
  });
});

app.use("/api/productos", RouterProductos);

// Escucha el puerto 4000 y lanza lo que se le pase
app.listen(PORT, () => {
  console.log("Servidor Express escuchando en el puerto 4000");
});
