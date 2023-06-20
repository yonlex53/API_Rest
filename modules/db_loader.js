import Character from "../models/character.js";
import Location from "../models/location.js";
import Episode from "../models/episode.js";

import fetch from "node-fetch";

var urlRickAPI = 'https://rickandmortyapi.com/api/';

var objectCategory = {
    'character' : Character,
    'location' : Location,
    'episode' : Episode
}

function saveElements(elementsList, model){
    
    elementsList.forEach( async element => {
        let coincidence = await model.find({id : element.id});
        let exists = coincidence.length > 0 ? true : false
        let newRegister = await new model(element);
        if(!exists){
            await newRegister.save();
        }
    });
}

const categoryList = Object.keys(objectCategory)

    const elements = categoryList.map(async category => {
        const elementsFirstRequestResponse = await fetch(urlRickAPI + category)
        const elementsFirstRequest = await elementsFirstRequestResponse.json()
        const onlyElementsFirstReq = elementsFirstRequest.results
        
        let pages = await elementsFirstRequest.info.pages
        
        for(let page = 2; page <= pages; page++){
            var urlPage = `${urlRickAPI}${category}?page=${page}`;
            const restElementsFollowingPagesResponse = await fetch(urlPage, {method: 'GET'})
            const restElementsFollowingPages = await restElementsFollowingPagesResponse.json()
            const onlyELements = restElementsFollowingPages.results
            onlyElementsFirstReq.push(...onlyELements)
        }
        
        saveElements(onlyElementsFirstReq, objectCategory[category])  
    })

export default categoryList;