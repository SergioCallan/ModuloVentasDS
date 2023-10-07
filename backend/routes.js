const express = require('express');
const app = express();
const cors= require('cors')

const port = process.env.PORT || 3000;

const pool = require('./connection'); // Importa la configuración de la base de datos

app.use(cors())
app.use(express.json());

// Buscar por DNI
app.get('/searchdni/:dni', async (req, res) => {
  try {
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
});

//Buscar producto por nombre
app.get('/searchproduct/:nombre', async (req, res) => {
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
});

//Buscar producto por marca
app.get('/searchbrand/:marca', async (req, res) => {
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
});

//Buscar producto por modelo
app.get('/searchmodel/:modelo', async (req, res) => {
  try {
    const modelo= decodeURIComponent(req.params.modelo)
    const query = "SELECT * FROM celular WHERE modelo = $1";
    const result= await pool.query(query, [modelo])
    
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
});

//Buscar producto por precio
app.get('/searchprodasduct/:producto', async (req, res) => {
  try {
    const producto= decodeURIComponent(req.params.producto)
    const query = "SELECT * FROM celular WHERE CONCAT(marca, ' ', modelo) = $1";
    
    const result= await pool.query(query, [producto])
    
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
});


//Crear producto(temporal)
app.post('/registerproduct', async(req, res)=>{
    try {
        const { id, nombre, marca, modelo, precio, color, almacenamiento, idgarantia } = req.body;
        const query = 'INSERT INTO celular (id, nombre, marca, modelo, precio, color, almacenamiento, idgarantia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        const values = [id, nombre, marca, modelo, precio, color, almacenamiento, idgarantia];
    
        const result = await pool.query(query, values);
    
        res.json(result.rows[0]);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al crear el dato.' });
      }
})

//Crear venta(temporal)
app.post('/registersell', async(req, res)=>{
  try {
      const detalle = req.body.id_detalle;
      const dni_empleado = req.body.dni_empleado;
      const dni_cliente = req.body.dni_cliente;
      const fecha = req.body.fecha;
      const query = 'INSERT INTO venta VALUES ($1, $2, $3, $4)';
      const values = [detalle, dni_empleado, dni_cliente, fecha];
  
      const result = await pool.query(query, values);
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al crear el dato.' });
    }
})


app.post('/sellproduct', async(req, res)=>{
  try {
      const id = req.body.id;
      const detalle = req.body.id_detalle;
      const id_producto = req.body.id_producto;
      const id_descuento = req.body.id_descuento;
      const query = 'INSERT INTO ventaproducto VALUES ($1, $2, $3, $4)';
      const values = [id, detalle, id_producto, id_descuento];
  
      const result = await pool.query(query, values);
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al crear el dato.' });
    }
})

//Crear servicio
app.post('/sellservice', async(req, res)=>{
  try {
      const id = req.body.id;
      const detalle = req.body.id_detalle;
      const id_servicio = req.body.id_servicio;
      const id_descuento = req.body.id_descuento;
      const query = 'INSERT INTO ventaservicio VALUES ($1, $2, $3, $4)';
      const values = [id, detalle, id_servicio, id_descuento];
  
      const result = await pool.query(query, values);
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al crear el dato.' });
    }
})

//Crear cliente(temporal)
app.post('/registeruser', async(req, res)=>{
    try {
        const { dni, nombres, apellidos, email, fechanac, distrito, departamento, sexo } = req.body;
        const query = 'INSERT INTO clientes (dni, nombres, apellidos, email, fechanac, distrito, departamento, sexo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        const values = [dni, nombres, apellidos, email, fechanac, distrito, departamento, sexo];
    
        const result = await pool.query(query, values);
    
        res.json(result.rows[0]);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al crear el dato.' });
      }
})

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});