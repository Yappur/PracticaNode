//Importaciones
const fs = require("fs");
const http = require("http");


//Funcion para leer el inventario desde un archivo de texto sincronicamente
function leerInventario() {
  try {
    const inventario = fs.readFileSync(
      "./inventario.txt",
      "utf-8",
      (err, data) => {
        console.log(data);
      }
    );
    return inventario;
  } catch (err) {
    console.error("Error", err);
  }
}

leerInventario();

// Crear un Servidor HTTP que muestra el inventario leído desde el archivo
const servidor = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text" });
    res.end(

      `<h1>Bienvenido a mi home</h1> <h2>Inventario:</h2> <p>${leerInventario()}</p>`
    );
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>404 - Not Found</h1>");
  }
});

servidor.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});