import Location from '../models/location.js'
import Character from '../models/character.js'
import Episode from '../models/episode.js'
import { Model } from 'mongoose';

const models = {
    'locations': Location,
    'characters' : Character,
    'episodes' : Episode
}


var APIController = {

    getCategories : function (req, res, next) {
        return res.status(200).send({
            "characters": "127.0.0.1:3700/api/characters/page/1",
            "locations": "127.0.0.1:3700/api/locations/page/1",
            "episodes": "127.0.0.1:3700/api/episodes/page/1"
        });
    },

    getDocuments: async function (req, res, next) {
        console.log('Han hecho una petición')
        let category = req.params.category;
        let page = parseInt(req.params.page);
        let top = parseInt(page*20);
        let bot = parseInt(top-19);
        let nextPage = `http://127.0.0.1:3700/api/${category}/page/${page+1}`;
        let prevPage = `http://127.0.0.1:3700/api/${category}/page/${page-1}`;
        let totalPages = 0;
        let model = models[category];

        try{
            const documents  = await model.find({ id: { $gte : bot , $lte : top } }, {_id : 0, __v : 0}).limit(20);
            const count = await model.countDocuments();
            totalPages = Math.round((count/20)+ 0.5);
            if(page == 1){
                prevPage = null
            }else if(page == totalPages){
                nextPage = null
            }

            if(documents.length == 0) return res.status(404).send({
                message: 'There is nothing here'
            });
            
            return res.status(200).json({
                info: {
                    'documents': count,
                    'pages' : totalPages,
                    'next' : nextPage,
                    'prev' : prevPage
                },
                'typeof' : typeof documents, 
                'results' : documents

            });
        } catch (error) {
            console.log('Error en la consulta')
            return res.status(500).send({
                message : 'Ocurrió un error al solicitar la información'
            });
        }
        
    },

    getFirstDocuments : function (req, res) { 
        let URL = req.url.split('/')[1];
        res.redirect(`/api/${URL}/page/1`);
    }
}


export default APIController;