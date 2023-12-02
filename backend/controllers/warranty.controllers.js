const pool= require ('../db')

const searchWarranty= async (req, res)=>{
    try{
        const id_garantia= req.params.id_garantia
        const query= "SELECT * FROM garantia WHERE id_garantia=$1"
        const results= await pool.query(query, [id_garantia])
        if(results.rows.length===0){
            res.json(null)
        }
        else{
            res.json(results.rows[0])
        }
    }catch(error){
        console.error("Error al conseguir los datos de la garantia: ", error)
    }
}

module.exports={
    searchWarranty
}