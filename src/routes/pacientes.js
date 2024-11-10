import { Router } from "express";
const router = Router();

import  controller  from "../controllers/pacientesController.js";
const pacientesController= controller;

router.get('/', pacientesController.list);

router.post('/add', pacientesController.save);

router.get('/delete/:id', pacientesController.delete);

router.get('/update/:id', pacientesController.edit);

router.post('/update/:id', pacientesController.update);

export default router;