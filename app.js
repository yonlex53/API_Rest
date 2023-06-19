import express from 'express';
import pkg from 'body-parser';
const { urlencoded, json } = pkg;

var app = express();

//cargar archivos de rutas

//middlewares
app.use(urlencoded({extended:false}));
app.use(json());

//CORS


//rutas
app.get('/', (req, res)=>{
    res.status(200).send({
        'saludo' : 'Hola mundo!'
    }
    );
});

app.get('/test', (req, res) => {
    res.status(200).send({
        'mensaje' : 'Hola mundo desde mi node-js'
    }) 
})

app.post('/signup', (req, res) => {
    console.log(req);
    /*
    {
        'username' : username,
        'password' : password
    }

    let username = req.username;
    let password = req.password;

    mongoose

    ** Comprobaciones **
    mal => 
    res.status(400).send({
        'mensaje' : 'Error en los datos ingresados'
    });
    bien => 
    res.status(200).send( 
    {
        'mensaje' : 'Datos correctos'
    });
    */

    
})

/* http request method

Desde el punto de vista del frontend/navegador
get => obtener datos/objetos
post => subir/enviar datos/objetos
put => actualizar datos/objetos
delete => eliminar datos/objetos
patch => actualizar datos/objetos

JSON => Javascript Object Notation

var data = {
    'key' : 'value',
    'id' : 'id_value',
    'name' : 'name_value',
    'url' : 'url_value'
}

***** Navegador *****
<html>
<head>Formulario</head>
<body>
<form method='post' action='127.0.0.1:3700/signup/' id='form'>
<label for='username'>Usuario</label>
<input type='text' id='username' name='username'>

<label for='password'>Clave</label>
<input type='password' id='password' name='password'>

<input type='submit' value='Iniciar sesión'> 
</form>
</body>
</html>

***** JS ***** frontend
var form = document.querySelector('#form');
let username = form.username
let password = form.password

** Comprobaciones **

let peticion = {
    'username' : username,
    'password' : password
}

=> enviar al backend => post => 
ajax.post(url_servidor, peticion)
.then(response => response.json())
.then(resp => {
    console.log(resp);
    //'Datos correctos'
    positiva();
})
.catch(e => {
    console.log(e.mensaje);
    //'Error en los datos ingresados'
    negativa();
})


MVC => Model, View, Controller => Modelo, vista, controlador
Modelo => Esquema de objetos que se manipulan en la base de datos => Backend => Manejo de datos en el servidor (Manejo entre backend y DB)
Vista => Estructura visual dada al usuario => UI => User interface /UX => User Experience => HTML, CSS, JS => Framework
Controlador => Ficheros JS del frontend que reciben y envian datos desde/hacia frontend/backend

*/


//exportar modulo