import express from "express";
import router from "./router";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOPtions } from "./config/swagger";
import colors from 'colors';
import db from "./config/db";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

export async function connectDb() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue('Conexión exitosa a la Base de Datos'))
    } catch (error) {
        console.log(colors.red.bold('Error al conectarse a la Base de Datos'))
    }
}

connectDb()

const server = express()
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('CORS Error'))
        }
    }
}

server.use(cors(corsOptions))
server.use(express.json())
server.use(morgan('dev'))

server.use('/api/products', router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOPtions))
export default server