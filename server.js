// Configuraciones de Express basica
const express = require("express");
const app = express();
const PORT = 4000;

const productos = [
  { id: 1, nombre: "Silla", precio: 100 },
  { id: 2, nombre: "Mesa", precio: 200 },
  { id: 3, nombre: "Sofa", precio: 300 },
];

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

// Ruta GET para obtener todos los productos
app.get("/api/productos", (req, res) => {
  res.status(200).json({
    message: "Productos obtenidos correctamente",
    productos: productos,
  });
});

app.post("/api/productos", (req, res) => {
  const nuevoProducto = req.body;
  const id = req.body.id;

  if (req.body.id || req.body.nombre || req.body.precio) {
    return res.status(400).json({ message: "No se envio ningun producto" });
  }

  productos.push(nuevoProducto);

  res.status(201).json({
    message: "Producto creado correctamente",
    producto: nuevoProducto,
    productos: productos,
  });
});

// Escucha el puerto 4000 y lanza lo que se le pase
app.listen(PORT, () => {
  console.log("Servidor Express escuchando en el puerto 4000");
});
