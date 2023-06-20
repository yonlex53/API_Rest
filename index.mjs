import mongoose from "mongoose";
import express from "express";
import categoryList from './modules/db_loader.js'

var app = express();
var port = 3700;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Rick&Morty_API');
}

main()
.then(()=>{
    console.log('Conectado a base de datos');
})
.catch(e => console.log(e, 'Error al conectarse a la base de datos'));

const dbLoader = categoryList;