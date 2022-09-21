const express = require('express')
const {productosDaos: Producto} = require('../daos/mainDaos')
const routerProd = express.Router()

const prod = new Producto()

routerProd.get('/:id', async (req, res) => {   
    const id = req.params.id
    if (id === "all")
    {
        try {
            const productos = await prod.getAll()
            res.status(200).send({
                status: 200,
                data: {
                    productos,
                },
                message:'productos encontrados'
                })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: error.message
            })
        }
        
    }else{
        try {
            const producto = await prod.getById(id)
            res.status(200).send({
                status: 200,
                data: {
                    producto,
                },
                message:'producto encontrado'
                })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: error.message
            })
        }
    } 
})


routerProd.post('/', function(req, res, next){
    
    if (req.query.admin == 1){
        console.log("Se conecto un admin")
        
        next()
    }else {
        res.send({ error: "No se logeo como admin"})
    }
},async (req, res) => { 
    try {
        const prod = new Producto()
        const id = await prod.save(req.body)
        res.status(200).send({
            status: 200,
            data: {
                id,
            },
            message:'producto agregado'
            })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
    
}
);


routerProd.put('/:id', function(req, res, next){
    
    if (req.query.admin == 1){
        console.log("Se conecto un admin")
        
        next()
    }else {
        res.send({ error: "No se logeo como admin"})
    }
}, async (req, res) => { 
    const num = req.params.id
    try {
        let idProd = parseInt(num)
        const prod = new Producto()
        const cambio = req.body
        const cambiado = await prod.changeById(idProd, cambio)
        res.status(200).send({
            status: 200,
            data: { 
                cambiado,
            },
            message:'producto actualizado'
            })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
});


routerProd.delete('/:id', function(req, res, next){
    
    if (req.query.admin == 1){
        console.log("Se conecto un admin")
        
        next()
    }else {
        res.send({ error: "No se logeo como admin"})
    }
}, async (req, res) => { 
    const num = req.params.id
    try {
        let idProd = parseInt(num)
        const prod = new Producto()
        const borrar = await prod.deleteById(idProd)
        res.status(200).send({
            status: 200,
            data: { 
                borrar,
            },
            message:'producto eliminado'
            })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
    
});

module.exports = routerProd