import { Router } from "express";
import creadorProductosFaker from "../models/mocks/generadorDeProductos.js";

const productosRouter = new Router();

productosRouter.get("/api/productos-test", (req, res) => {
    let productosData = creadorProductosFaker(5);

    if(productos.length > 0){
        res.render("pages/productosLista", { productos: productosData, hayProductos: true })
    } else {
        res.render("pages/productosLista", { productos: productosData, hayProductos: false })
    }
})

export default productosRouter;