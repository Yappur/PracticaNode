// Configuraciones de Express basica
const express = require("express");
const app = express();
const PORT = 4000;

// Middleware: Son una funcion que va a intervenir entre la http.req y la http.res

app.use(express.json()); // Permite recibir datos en formato json

// Se crean las rutas con express
// req = request, res = response
app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a mi home</h1>");
});

app.post("api/products", (req, res) => {
const nuevoProducto = req.body;

if(!nuevoProducto){
  return res.status(400).send({error: "El producto no puede ir vacio"});
}

nuevoProducto.push(nuevoProducto);

console.status(201).log(nuevoProducto);
});

// Escucha el puerto 4000 y lanza lo que se le pase
app.listen(PORT, () => {
  console.log("Servidor Express escuchando en el puerto 4000");
});
