import express from "express";
import APIController from '../controllers/API_controller.js';

//Instanciar express y su Objeto Router
var API_router = express.Router();

API_router.get('/', APIController.getCategories);
API_router.get('/characters', APIController.getFirstDocuments);
API_router.get('/locations', APIController.getFirstDocuments);
API_router.get('/episodes', APIController.getFirstDocuments);
API_router.get('/:category/page/:page', APIController.getDocuments);
/* API_router.post('/test', ProjectController.test);
API_router.post('/save-project', ProjectController.saveProject);
API_router.get('/project/:id?', ProjectController.getProject);
API_router.get('/projects', ProjectController.getProjects);
API_router.put('/project/:id', ProjectController.updateProject);
API_router.delete('/project/:id', ProjectController.deleteProject);
API_router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
 */
export default API_router;