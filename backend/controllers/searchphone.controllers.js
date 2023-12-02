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
const searchbrand= async(req, res)=>{
    try {
        const marca= req.params.marca
        const query = "SELECT * FROM celular WHERE marca = $1";
        const result= await pool.query(query, [marca])
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

//Buscar producto por modelo
const searchmodel= async(req, res)=>{
    try {
        const modelo= decodeURIComponent(req.params.modelo)
        const query = "SELECT * FROM celular WHERE modelo = $1";
        const result= await pool.query(query, [modelo])
        console.log(modelo)
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

const searchprice= async(req, res)=>{
    try {
        const {preciomin, preciomax}= req.query
        const query = "SELECT * FROM celular WHERE precio BETWEEN $1 AND $2";
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
const searchid= async(req, res)=>{
    try {
        const idbusqueda= req.params.id
        const query = "SELECT * FROM celular WHERE id_celular = $1";
        
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
    searchproduct,
    searchbrand,
    searchmodel,
    searchprice,
    searchid
}