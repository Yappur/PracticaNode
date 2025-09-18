const express = require("express");
const router = express.Router();

const productos = [
  { id: 1, nombre: "Silla", precio: 100 },
  { id: 2, nombre: "Mesa", precio: 200 },
  { id: 3, nombre: "Sofa", precio: 300 },
];

// Ruta GET para obtener todos los productos
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Productos obtenidos correctamente",
    productos: productos,
  });
});

router.post("/", (req, res) => {
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

module.exports = router;
