const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
    idTarea: {
        type: Number,
        required: true
    },
    nombreTarea: {
        type: String,
        required: true
    },
    detalleTarea: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('tarea', TareaSchema, 'Tareas');