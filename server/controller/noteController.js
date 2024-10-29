const Note = require("../model/noteModel");
const History = require("../model/historyModel");
const { ObjectId } = require("mongodb");

/**
 * @method findAllNotes Obtener Todas las Notas
 * @description Obtiene una lista de todas las notas  
 */
exports.findAllNotes = async (req, res) => {
    try {
        const notes = new Note();
        console.log(req.data);
        let result = await notes.getAllNotes({id_user: "6718dd9a51d1d0d3a4fa040a"}); 
        res.status(result.status).json(result);
    } catch (error) {
        let err = JSON.parse(error.message);
        return res.status(err.status).send(err);
    }
}

/**
 * @method findNoteById Obtener Una Nota Especifica
 * @description Obtiene los detalles de una nota especifica
 */
exports.findNoteById = async (req, res) => {
    try {
        // const data = {
        //     id_user: req.data._id,
        //     ...req.params
        // }
        const data = {
            id_user: '6718dd9a51d1d0d3a4fa040a',
            ...req.params
        }
        const notes = new Note();
        let result = await notes.getOneByNoteId(data);
        if (result.status === 404) return res.status(404).json({status: 404, message: "Note not found"});
        return res.status(result.status).json({result})
    } catch (error) {
        let err = JSON.parse(error.message);
        return res.status(err.status).send(err);
    }
}

/**
 * @method findAllNotesByTitleOrDescription Buscar notas
 * @description Buscar notas por titulo o contenido
 */
exports.findAllNotesByTitleOrDescription = async (req, res) => {
    try {
        const data = {
            id_user: '6718dd9a51d1d0d3a4fa040a',
            q: req.params.id
        }
        const notes = new Note();
        let result = await notes.searchNoteByTitleDescription(data);
        if (result.status === 404) return res.status(404).json({status: 404, message : "Note not found"});
        return res.status(result.status).json({result});
    } catch (error) {
        let err = JSON.parse(error.message);
        return res.status(err.status).send(err);
    }
} 

/**
 * @method findNoteChangeHistory Obtener Historial de cambios de nota
 * @description Obtiene el historial de cambios de una nota especifica
 * TODO: devuelve un token JWT, Solo Admin
 */
exports.findNoteChangeHistory = async(req, res) =>{
    try {
        const history = new History();
        let result = await history.getHistoryByNoteId(req.params.id);
        if (result.status === 404) return res.status(404).json({status: 404, message : "Note not found"});
        return res.status(result.status).json({result});
    } catch (error) {
        let err = JSON.parse(error.message);
        return res.status(err.status).send(err);
    }
}

/**
 * @method save Crear nota
 * @description Crea una nota nueva
 */
exports.save = async(req, res) =>{
    try {
        const notes = new Note();
        let result = await notes.save(req.dody);
        if (result.status === 500) return res.status(500).json({status: 500, message : "Note not saved, someting happends"});
        return res.status(result.status).json({result});
    } catch (error) {
        let err = JSON.parse(error.message);
        return res.status(err.status).send(err);
    }
}

/**
 * @method updateNoteById Actializar nota
 * @description Acturaliza una nota no existente
 */
exports.updateNoteById = async(req, res) =>{
    try {
        const data = {
            id: new ObjectId("671e88983f1ad01b1537d2db"),
            id_user: '6718dd9a51d1d0d3a4fa040a',
            ...req.body
        }
        const history = new History();
        let resultHistory = await history.updateHistorybyNoteId(data);
        if (resultHistory.status === 500) return res.status(500).json({status: 500, message : "Note not saved, someting happends"});
        history.destructor();
        const note = new Note();
        data.history = resultHistory.data.insertedId;
        let resultNote = await note.updateHistoryNoteById(data);
        if (resultNote.status === 500) return res.status(500).json({status: 500, message : "Note not saved, someting happends"});
        return res.status(resultNote.status).json({resultNote});
    } catch (error) {
        let err = JSON.parse(error.message);
        return res.status(err.status).send(err);
    }
}

/**
 * @method deleteNoteById Eliminar nota
 * @description Elimina una nota especifica
 */
exports.deleteNoteById = async(req, res) =>{
    try {
        const data = {
            id_user: '6718dd9a51d1d0d3a4fa040a',
            ...req.params
        }
        const notes = new Note();
        let result = await notes.deleteNoteById(data);
        if (result.status === 404) return res.status(404).json({status: 404, message : "Note not found"});
        return res.status(result.status).json({result});
    } catch (error) {
        let err = JSON.parse(error.message);
        return res.status(err.status).send(err);
    }
}