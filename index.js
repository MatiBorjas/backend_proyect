//---------------------------------------------------------------------
//                    SERVIDOR  EXPRESS
//---------------------------------------------------------------------
const express = require('express')
const routerProd = require('./routers/productos')
const routerCarr = require('./routers/carrito')


const app = express()
let acceso = true

app.use(express.urlencoded({extended: true}))
app.use(express.json())

if (acceso === true){
    app.use('/api/productos', routerProd)
    app.use('/api/carrito', routerCarr)
}else {
    console.log("no teine acceso")
}


/* Escuha del servidor */
const PORT = process.env.PORT || 8080
const server = app.listen(PORT , () => console.log(`servidor en puerto ${PORT}`))
server.on('error', (error) => console.log(`Error en servidor ${error}`))