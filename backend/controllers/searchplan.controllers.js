const pool= require ('../db')

//Buscar producto por nombre
const searchproduct= async(req, res)=>{
    try {
        const producto= decodeURIComponent(req.params.nombre)
        const query = "SELECT * FROM celular WHERE CONCAT(marca, ' ', modelo) = $1";
        const result= await pool.query(query, [producto])
        console.log(result.rows)
        if(result.rows.length===0){
            res.json(null)
        }
        else{
            res.json(result.rows)
        }
    } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    }
}

//Buscar producto por marca
const searchplan= async(req, res)=>{
    try {
        const tipo= req.params.tipo
        const query = "SELECT * FROM plan WHERE tipo = $1";
        const result= await pool.query(query, [tipo])
        if(result.rows.length===0){
            res.json(null)
        }
        else{
            res.json(result.rows)
        }
    } catch (error) {
    console.error('Error al obtener plan:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    }
}

//Buscar producto por modelo
const searchmegas= async(req, res)=>{
    try {
        const megas= req.params.megas
        const query = "SELECT * FROM plan WHERE megas = $1";
        const result= await pool.query(query, [megas])
        if(result.rows.length===0){
            res.json(null)
        }
        else{
            res.json(result.rows)
        }
    } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const searchplanprice= async(req, res)=>{
    try {
        const {preciomin, preciomax}= req.query
        const query = "SELECT * FROM plan WHERE precio BETWEEN $1 AND $2";
        const result= await pool.query(query, [preciomin, preciomax])
        if(result.rows.length===0){
            res.json(null)
        }
        else{
            res.json(result.rows)
        }
    } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    }
}

//Buscar producto por id
const searchplanid= async(req, res)=>{
    try {
        const idbusqueda= req.params.id
        const query = "SELECT * FROM plan WHERE id_plan = $1";
        
        const result= await pool.query(query, [idbusqueda])
        
        if(result.rows.length===0){
            res.send({id: null})
        }
        else{
            res.json(result.rows[0])
        }
    } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports={
    searchplan,
    searchmegas,
    searchplanprice,
    searchplanid
}