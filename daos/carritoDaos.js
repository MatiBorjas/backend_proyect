const admin = require('firebase-admin')
const config= require('./firebase-db/firebaseConfig.json')
const Producto = require('./productoDaos')


const Productos = new Producto()

class Carrito {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(config),
            databaseURL: 'https://backend-ecommerce-c49ef.firebaseio.com'
        })
    }

    async newCarrito() {
        const db = admin.firestore()
        const query = db.collection('carritos')
        let time = new Date()
        try {
            function random(min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            }

            const doc = query.doc()
            const idCarrito = random(1, 100);
            const carrito = await doc.create({
                timestamp: time.toString(),
                productos: [],
                idC: idCarrito
            })
            return carrito
        }catch (error){
            throw Error(error.message)
        }
    }

    async getCarritoById(idC) {
        try {
            const db = admin.firestore()
            const query = db.collection('carritos')
            const doc = query.doc(String(idC))
            const encontrado = await doc.get()
            return encontrado.data()
    
        } catch (error){
            throw Error(error.message)
        }
    }

    async deleteCarritoById(idC) {
        try {
            const db = admin.firestore()
            const query = db.collection('carritos')
            const doc = query.doc(String(idC))
            await doc.delete()

    
        } catch (error){
            throw Error(error.message)
        }
    }


    async deleteProductoDeCarrito(idCarrito, idProducto, idEnCarrito) {
        try {
            function random(min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            }
            
            let productoABorrar = await Productos.getById(idProducto)


            const db = admin.firestore()
            const query = db.collection('carritos')
            const doc = query.doc(idCarrito)

            productoABorrar.idC = idEnCarrito

            const item = await doc.update({
                productos: admin.firestore.FieldValue.arrayRemove(String(productoABorrar))
            })

        } catch (error){
            throw Error(error.message)
        }
    }

    async agregarProducto(idCarrito, idProducto) {
        try {
            function random(min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            }
            
            let productoABorrar = await Productos.getById(idProducto)


            const db = admin.firestore()
            const query = db.collection('carritos')
            const doc = query.doc(idCarrito)

            let idrand = random(1,10000)

            productoABorrar.idC = String(idrand)

            const item = await doc.update({
                productos: admin.firestore.FieldValue.arrayUnion(String(productoABorrar))
            })

        } catch (error){
            throw Error(error.message)
        }
    }
}

module.exports = Carrito