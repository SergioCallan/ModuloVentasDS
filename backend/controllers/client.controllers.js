const pool= require('../db')

//Buscar cliente por dni
const searchdni= async(req, res)=>{
    try{
        const dni= req.params.dni
        const query = 'SELECT * FROM clientes WHERE dni = $1';
        const result= await pool.query(query, [dni])
        if(result.rows.length===0){
            res.send({nombres: null})
        }
        else{
            res.json(result.rows[0])
        }
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports={
    searchdni
}