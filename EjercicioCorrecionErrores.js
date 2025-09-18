const express = require("express");
const app = express();
const PORT = 4000;

const productos = [
  { id: 1, nombre: "Silla", precio: 2000 },
  { id: 2, nombre: "Mesa", precio: 3000 },
];

// ERROR 1: Middleware roto, ¿Pista? es un middleware que necesita continuar... ✅
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// ERROR 2: Autorización que no autoriza, ¿Pista? Si no hay authorization en los 'headers', ¿continua?
const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ mensaje: "No autorizado" });
  }
  next();
};

app.use(express.json());
app.use(logger);
// app.use(auth);

app.get("/api/productos", (req, res) => {
  res.json(productos);
});

// ERROR 3: Validación incorrecta, ¿Pista? req.body puede ser un objeto vacío '{}' ✅
app.post("/api/productos", (req, res) => {
  if (!req.body.nombre || !req.body.precio) {
    return res.status(400).json({ mensaje: "No hay datos" });
  }

  const nuevoProducto = {
    id: productos.length + 1,
    nombre: req.body.nombre,
    precio: req.body.precio,
  };

  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// ERROR 4: Parámetro sin validar, ¿Pista? ID tiene que ser un número ✅
app.get("/api/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ mensaje: "ID inválido: No es un número" });
  }

  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  res.json(producto);
});

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
