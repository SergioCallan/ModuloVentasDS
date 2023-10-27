const pool = require('../db')

const getAllPhone = async (req, res, next ) => {
    try{
        const allTasks = await pool.query('Select * FROM celular');
        res.json(allTasks.rows);
    } catch (error){
        next(error);
    }
}

const getPhone =  async (req, res) => {
    try {
        const {id} = req.params
        const result = await pool.query('SELECT * FROM  celular WHERE id_celular = $1',[id])
        if(result.rows.length === 0)
        return res.status(404).json({
            message: "Task not found"
        })
    return res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}

const createPhone = async (req, res, next) => {
    try {        
        const {id, marca, modelo, precio, color, almacenamiento} = req.body;
        console.log(id)
        const result = await pool.query('INSERT INTO celular (id_celular, marca, modelo, precio, color, almacenamiento) VALUES ($1,$2,$3,$4,$5, $6) RETURNING *',[
            id, marca, modelo, precio, color, almacenamiento
        ]);

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deletePhone = async (req, res, next) => {
    const {id} = req.params;

    try {
        const result = await pool.query("DELETE FROM celular WHERE id_celular = $1", [id]);

        if (result.rowCount === 0)
        return res.status(404).json({message: "Task not found"});
    return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updatePhone = async (req, res, next) => {
    try{
        const {id} = req.params;
        const {marca, modelo, color, almacenamiento, precio} = req.body;

        const result = await pool.query("UPDATE celular SET marca = $1, modelo = $2, color= $3, almacenamiento = $4, precio = $5 WHERE id_celular = $6",[marca, modelo, color, almacenamiento, precio, id]);

        if (result.rows.length) return res.status(404).json({ message: "Task nor found"});
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllPhone,
    getPhone,
    createPhone,
    deletePhone,
    updatePhone
}