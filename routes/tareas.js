const express = require('express');
const tarea = require('../models/tarea');

const router = express.Router();
const Tarea = require('../models/tarea');


//Obtener Todos
router.get('/', async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.json(tareas);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

//Obtener uno
router.get('/:id', getTarea, (req, res) => {
    res.json(res.tarea);
});

//Crear uno
router.post('/', async (req, res) => {
    const tarea = new Tarea({
        idTarea: req.body.idTarea,
        nombreTarea: req.body.nombreTarea,
        detalleTarea: req.body.detalleTarea,
    });
    try {
        const newTarea = await tarea.save()
        res.status(201).json(newTarea)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});

//Actualiza uno
router.patch('/:id', getTarea, async (req, res) => {
    if (req.body.idTarea != null) {
        res.tarea.idTarea = req.body.idTarea;
    };
    if (req.body.nombreTarea != null) {
        res.tarea.nombreTarea = req.body.nombreTarea;
    };
    if (req.body.detalleTarea != null) {
        res.tarea.detalleTarea = req.body.detalleTarea;
    };
    try {
        const updatedTarea = await res.tarea.save();
        res.json(updatedTarea);
    } catch (err) {
        res.status(400).json({message: err.message});
    };
});

//Eiminar uno
router.delete('/:id', getTarea, async (req, res) => {
    try {
        await res.tarea.remove();
        res.json({message: 'Tarea Eliminada'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

async function getTarea(req, res, next) {
    let tarea;
    try {
        tarea = await Tarea.findById(req.params.id)
        if (tarea == null) {
            return res.status(404).json({message: 'No se encuentra la tarea'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.tarea = tarea;
    next();
}

module.exports = router;