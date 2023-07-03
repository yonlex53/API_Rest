//Módulo servidor de peticiones http
import express from 'express';
import pkg from 'body-parser';
const { urlencoded, json } = pkg;
import API_router from './routes/API_routes.js';
import mongoose from "mongoose";

//Módulo clonador de la API y registrador de objetos en las colecciones
//import categoryList from './modules/db_loader.js'
// const dbLoader = categoryList;

//cargar archivos de rutas
var app = express();

var port = 3700;

async function dbConnection() {
    console.log('Intentando establecer conexión con la base de datos...')
    await mongoose.connect('mongodb://127.0.0.1:27017/Rick&Morty_API')
    return new Promise((resolve) => resolve('Conexión exitosa!') );
}

try {
    const dbConnect = await dbConnection();
    console.log(dbConnect);
}
catch(error) {
    console.log('*******************************************\nHa ocurrido un error, no se pudo conectar a la base de datos! \nError: ', error.name, '\n*******************************************');
}
finally {
    app.listen(port, ()=>{    
    console.log('Servidor iniciado!');
})
}



//middlewares
app.use(urlencoded({extended:false}));
app.use(json());

//CORS
// Configurar cabeceras y cors
/*
Cuando hacemos peticiones AJAX con jQuery o Angular a un backend o un API REST es normal que tengamos problemas con el acceso CORS en NodeJS y nos fallen las peticiones.

Para eso podemos crear un middleware como este:
*/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    //funcion next() pide al intérprete que ejecute el código que sigue
    next();
});

//rutas
//El primer parametro es el path
app.use('/api', API_router)

