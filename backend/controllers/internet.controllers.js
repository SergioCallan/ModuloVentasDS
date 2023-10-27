const pool = require('../db')

const getAllInternet = async (req, res, next ) => {
    try{
        const allTasks = await pool.query('Select * FROM internet');
        res.json(allTasks.rows);
    } catch (error){
        next(error);
    }
}

const getInternet = async (req, res, next) => {
    try {
        const {id} = req.params

        const result = await pool.query('SELECT * FROM internet WHERE id_internet = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({
            message: "No se encontro producto",
        })
    return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const createInternet = async (req, res, next) => {
    try {        
        const {id, megas, precio, estado} = req.body;
        const result = await pool.query('INSERT INTO internet (id_internet, megas, precio, estado) VALUES ($1,$2, $3, $4)',[
            id, megas, precio, estado
        ]);

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteInternet = async (req, res, next) => {
    const {id} = req.params;

    try {
        const result = await pool.query("DELETE FROM internet WHERE id_internet = $1", [id]);   
        if (result.rowCount === 0)
        return res.status(404).json({message: "Task not found"});
    return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updateInternet = async (req, res, next) => {
    try{
        const {id} = req.params;
        const {megas, precio} = req.body;
        const result = await pool.query("UPDATE internet SET megas = $1, precio = $2 WHERE id_internet = $3",[megas , precio, id]);
        if (result.rows.length) return res.status(404).json({ message: "Task nor found"});
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllInternet,
    getInternet,
    createInternet,
    deleteInternet,
    updateInternet
}