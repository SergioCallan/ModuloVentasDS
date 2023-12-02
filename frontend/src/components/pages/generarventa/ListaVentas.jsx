import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/EstilosGenerarVenta/ListaVentas.css"
import { CabeceraModulo } from "../../extras/CabeceraModulo.jsx";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { TCelda, TCelda2 } from "../../styles/CeldaTablaPersonalizada";

export default function ListaVentas() {
  const [data, setData]= useState([])
  const navigate= useNavigate()
  const [MostrarAgregar, setMostrarAgregar] = useState(true);

  const getdetails= async()=>{
    const idventa= localStorage.getItem("venta")
    const url0=`https://modulo-ventas.onrender.com/getselldetails/${idventa}`
    const response0= await axios.get(url0)
    if(response0.data==null){
      alert("No se encontraron productos en la lista")
      localStorage.removeItem('tipo')
      localStorage.removeItem('venta')
      navigate("/menuventas")
    }
    setData(response0.data)
    if(response0.data[0].tipo=="Plan"){
      setMostrarAgregar(false)
    }
  }

  useEffect(()=>{
    getdetails().catch((error)=>{
      console.log(error)
    })
  }, [])

  const CancelarTodo= async (e)=>{
    e.preventDefault();
    try{
      const idventa= localStorage.getItem("venta")
      const url1= `https://modulo-ventas.onrender.com/deletesell/${idventa}`
      const response1= await axios.delete(url1)
      alert("Se ha cancelado la venta")
      localStorage.clear()
      navigate("/buscarcliente")
    }catch(error){
      console.error("Error en la cancelacion de venta: ", error)
    }
  }

  const AgregarProducto= async (e)=>{
    e.preventDefault();
    if(localStorage.getItem("tipo")==="Celular"){
      navigate("/BuscarProducto")
    }
    else{ navigate("/BuscarPlan")}
  }


  const Registrar= async (e)=>{
    e.preventDefault();
    const venta={
      id_venta: localStorage.getItem("venta"),
      dni_cliente: localStorage.getItem("dnicliente"),
      fecha: new Date(),
      monto: 0
    }
    const id_venta= venta.id_venta
    const url0= `https://modulo-ventas.onrender.com/calculatesell/${id_venta}`
    const response0= await axios.get(url0)
    console.log(response0.data)
    venta.monto= response0.data.monto
    const url1= `https://modulo-ventas.onrender.com/registersell`
    const response1= await axios.post(url1, venta)
    alert("Venta realizada")
    if(localStorage.getItem("tipo")==="Plan" && localStorage.getItem("tipo")!=null){
      navigate("/asociarplan")
    }
    else{
      const promo= localStorage.getItem("promocionid")
      const url2= `https://modulo-marketing.onrender.com/modificarEstadoPromocion/${promo}`
      const response= await axios.put(url)
      localStorage.clear()
      navigate("/buscarcliente")
    }
  }

  return (
    <div>
      <main>
      <CabeceraModulo></CabeceraModulo>
      <div className="contenedor-cuerpo">
        <div className="contenedor-nombre-seccion">
          <h2>Lista de productos</h2>
        </div>
          <TablaDetalles datos={data}/>
       
        <div className="seccion-btns">
          <button className="Rojo btn-estructura" onClick={CancelarTodo}>Cancelar Venta</button>
          {MostrarAgregar && (
            <button className="Celeste btn-estructura" onClick={AgregarProducto}>Agregar otro producto</button>
                )}
          <button className="Verde btn-estructura" onClick={Registrar}>Confirmar venta</button>
        </div>
        </div>
      </main>
    </div>
  );
}

function TablaDetalles({datos}){
  const [nombresProductos, setNombresProductos] = useState([]);
  const navigate= useNavigate()
  const obtenerID=(id_producto)=>{
    localStorage.setItem("idcompra", id_producto)
  }

  const eliminarDetalle=async (id_detalle)=>{
    const url3= `https://modulo-ventas.onrender.com/deletedetail/${id_detalle}`
    const response= await axios.delete(url3)
    window.location.reload()
  }

  useEffect(() => {
    const fetchNombresProductos = async () => {
      const nombres = await Promise.all(
        datos.map(async (detalles) => {
          const nombre = await buscarNombre(detalles.id_producto, detalles.tipo);
          return nombre;
        })
      );
      setNombresProductos(nombres);
    };

    fetchNombresProductos();
  }, [datos]);

  const buscarNombre= async(id_producto, tipo)=>{
    console.log(tipo)
    if(tipo=="Plan"){
      const url=`https://modulo-ventas.onrender.com/searchplanid/${id_producto}`
      const response= await axios.get(url)
      console.log(response.data)
      return response.data.tipo+"- "+response.data.megas+ " megas"
    }
    else if(tipo=="Celular"){
      const url=`https://modulo-ventas.onrender.com/searchid/${id_producto}`
      const response= await axios.get(url)
      return response.data.marca+" "+response.data.modelo
    }
  }

  return(
    <TableContainer component={Paper} sx={{maxHeight:'300px', maxWidth: '95vw',marginBottom: '3vh'}}>
      <Table>
        <TableHead component={Paper} sx={{position:'sticky', top:'0px', height: '40px'}}>
          <TableRow>
            <TCelda2>ID de la venta</TCelda2>
            <TCelda2>ID de los detalles</TCelda2>
            <TCelda2>ID del producto</TCelda2>
            <TCelda2>Nombre del producto</TCelda2>
            <TCelda2>Cantidad</TCelda2>
            <TCelda2>Tipo de Compra</TCelda2>
            <TCelda2>ID de la garantia</TCelda2>
            <TCelda2>Tiempo de la garantia (Meses)</TCelda2>
            <TCelda2>Coste</TCelda2>
            <TCelda2>Opción</TCelda2>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((detalles, index)=>(
            <TableRow key={index}>
              <TCelda>{detalles.id_venta}</TCelda>
              <TCelda>{detalles.id_detalle}</TCelda>
              <TCelda>{detalles.id_producto}</TCelda>
              <TCelda>{nombresProductos[index]}</TCelda>
              <TCelda>{detalles.cantidad}</TCelda>
              <TCelda>{detalles.tipo}</TCelda>
              <TCelda>{detalles.id_garantia}</TCelda>
              <TCelda>{detalles.tiempo_garantia}</TCelda>
              <TCelda>{detalles.coste_total}</TCelda>
              <TCelda>
                <button className="Rojo" onClick={()=>eliminarDetalle(detalles.id_detalle)}>Eliminar de la lista</button>
              </TCelda>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}