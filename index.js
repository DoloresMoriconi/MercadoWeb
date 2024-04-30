//importar librerías
const express = require('express');
const exphbs = require('express-handlebars');

//instancia del servidor
const app = express()
app.listen(3000, () => {
   console.log("El servidor está inicializado en el puerto 3000");
});

//configuracion del motor de vistas
app.set("view engine", "handlebars")
app.engine('handlebars', exphbs.engine())

//Middleware
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"))
app.use("/popper", express.static(__dirname + "/node_modules/@popperjs/core/dist/umd"))
app.use("/assets", express.static(__dirname + "/assets"))
app.use(express.urlencoded({ extended: true }));

//rutas
//ruta raíz para renderizar el dashboard y manejar la selección de productos
let productosSeleccionados = [];
app.get("/", (req, res) => {
   res.render("dashboard", {
      productosMarket: ["banana", "cebollas", "lechuga", "papas", "pimenton", "tomate"],
      productosSeleccionados: productosSeleccionados
   });
});

//ruta para procesar la solicitud POST de agregar producto
app.post("/agregar-producto", (req, res) => {
   const producto = req.body.producto;
   productosSeleccionados.push(producto);
   res.redirect("/");
});