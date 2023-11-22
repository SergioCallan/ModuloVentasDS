import React, { useState, useEffect } from "react";
import Sidebar from "../../extras/Sidebar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/ListaVentas.css"
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

export default function ListaVentas() {
  const [data, setData]= useState([])
  const navigate= useNavigate()

  const getdetails= async()=>{
    const idventa= localStorage.getItem("venta")
    const url0=`https://modulo-ventas.onrender.com/getselldetails/${idventa}`
    const response0= await axios.get(url0)
    if(response0.data==null){
      alert("No se encontraron productos en la lista")
      localStorage.clear()
      navigate("/menuventas")
    }
    setData(response0.data)
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
      localStorage.clear()
      navigate("/buscarcliente")
    }
  }

  return (
    <div>
      <Sidebar />
      <main>
        <div className="Header">
          <h1>Módulo de Ventas</h1>
        </div>
        <div className="Lista">
          <h2 className="h2">Lista de productos</h2>
          <TablaDetalles datos={data}/>
        </div>
        <div className="Buttons">
          <button className="Rojo" onClick={CancelarTodo}>Cancelar Venta</button>
          <button className="Celeste" onClick={AgregarProducto}>Agregar otro producto</button>
          <button className="Verde" onClick={Registrar}>Confirmar venta</button>
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
    alert("Producto eliminado")
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID de la venta</TableCell>
            <TableCell>ID de los detalles</TableCell>
            <TableCell>ID del producto</TableCell>
            <TableCell>Nombre del producto</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Tipo de Compra</TableCell>
            <TableCell>ID de la garantia</TableCell>
            <TableCell>Tiempo de la garantia (Meses)</TableCell>
            <TableCell>Coste</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((detalles, index)=>(
            <TableRow key={index}>
              <TableCell>{detalles.id_venta}</TableCell>
              <TableCell>{detalles.id_detalle}</TableCell>
              <TableCell>{detalles.id_producto}</TableCell>
              <TableCell>{nombresProductos[index]}</TableCell>
              <TableCell>{detalles.cantidad}</TableCell>
              <TableCell>{detalles.tipo}</TableCell>
              <TableCell>{detalles.id_garantia}</TableCell>
              <TableCell>{detalles.tiempo_garantia}</TableCell>
              <TableCell>{detalles.coste_total}</TableCell>
              <TableCell>
                <button className="Rojo" onClick={()=>eliminarDetalle(detalles.id_detalle)}>Eliminar de la lista</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}