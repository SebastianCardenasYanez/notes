/**
 * @method save Crear nueva version de Nota
 * @description Guarda una nueva version de la nota
 * TODO: Sin interfaz grafica
 */
exports.save = async(req, res) =>{
    try {

    } catch (error) {
        let err = JSON.parse(error.message);
        return res.status(err.status).send(err);
    }
}


