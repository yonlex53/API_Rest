import mongoose from "mongoose";
import express from "express";
import fetch from "node-fetch";

import Character from "./models/character.js";
import Location from "./models/location.js";
import Episode from "./models/episode.js";

var app = express();
var port = 3700;
var urlRickAPI = 'https://rickandmortyapi.com/api/';

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Rick&Morty_API');
}

main()
.then(()=>{
    console.log('Conectado a base de datos');
})
.catch(e => console.log(e, 'Error al conectarse a la base de datos'));


function saveElements(elementsList, model){
    elementsList.forEach(element => {
        let newRegister = new model(element);
        if(!model.exists(newRegister)){
            newRegister.save();
        }
    });
}

async function getSaveElementsNextPages(pages, category, model){
    for (let i = 2; i <= pages.length; index++) {
        nextPage(category, i)
            .then(response => response.json())
            .then(elements =>{
                saveElements(elements, model);
            });
    }
}

var objectCategory = {
    'character' : Character,
    'location' : Location,
    'episode' : Episode
}

async function gettingAllElements(objectCategory){
    const categoryList = Object.keys(objectCategory)

    categoryList.forEach(category => {
        fetch(urlRickAPI + category)
            .then(response => response.json())
            .then( res => {

                var elements = res.results;
                var pages = res.info.pages;
                saveElements(elements, objectCategory[category]);
                var urlList = [];
                for(let page = 2; page <= pages; page++){
                    var urlPage = `${urlRickAPI}${category}?page=${page}`;
                    urlList.push(urlPage)
                }

                var nextElements = [];
                urlList.forEach(async url => {
                    await fetch(url, {method: 'GET'})
                        .then(response => {
                            //console.log('Estado de la solicitud:', response.status, response.ok);
                            return response.json()
                        })
                        .then( function (data) {
                            let results = data.results;
                            nextElements.push(results);
                        }, function (reason) {
                            console.log('Fallo en la peticion fetch', reason)
                        })
                        .catch(e => {
                            console.log('Error en las peticiones usando la función MAP en la ruta:', url, e)
                        })
                    
                })
                console.log(nextElements, 'Elementos requeridos!');
            })
            .catch(e => console.log(e, 'Error en solicitud'));
    });
}

await gettingAllElements(objectCategory);

/* fetch(urlRickAPI + 'character')
    .then(response => response.json())
    .then( res => {
        const characters = res.results;
        const pages = res.info.pages;
        saveElements(characters, Character);
        getSaveElementsNextPages(pages, 'character', Character);   
        /* characters.forEach(character => {
            let newRegister = new Character(character);
            if(!Character.exists(newRegister)){
                newRegister.save();
            }
        });
    })
    /* .then(async ()=>{
        //funcion async para ver los registros que están en la colección
        const all = await Character.find({}, {_id:0}).sort({id:'asc'});
        console.log(all);

    })
    .catch(e => console.log(e, 'Error en solicitud')); */


/* fetch(urlRickAPI + 'location')
    .then(response => response.json())
    .then( res => {
        const locations = res.results;
        locations.forEach(location => {
            let newRegister = new Location(location);
            if(!Location.exists(newRegister)){
                newRegister.save();
            }
        });
    })
    .catch(e => console.log(e, 'Error en solicitud')); */

/* let character = Character({id : 1});
console.log(character, character.$isNew); */