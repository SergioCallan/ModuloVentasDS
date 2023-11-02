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
    const url0=`http://localhost:4000/getselldetails/${idventa}`
    const response0= await axios.get(url0)
    if(response0.data==null){
      alert("No se encontraron productos en la lista")
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
      const url1= `http://localhost:4000/deletesell/${idventa}`
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
    }
    const url2= `http://localhost:4000/registersell`
    const response2= await axios.post(url2, venta)
    alert("Venta realizada")
    if(localStorage.getItem("tipo")==="Plan"){
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
  const navigate= useNavigate()
  const obtenerID=(id_producto)=>{
    localStorage.setItem("idcompra", id_producto)
  }

  const eliminarDetalle=async (id_detalle)=>{
    const url3= `http://localhost:4000/deletedetail/${id_detalle}`
    const response= await axios.delete(url3)
    alert("Producto eliminado")
    window.location.reload()
  }

  return(
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID de la venta</TableCell>
            <TableCell>ID de los detalles</TableCell>
            <TableCell>ID del producto</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Tipo de Compra</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((detalles, index)=>(
            <TableRow key={index}>
              <TableCell>{detalles.id_venta}</TableCell>
              <TableCell>{detalles.id_detalle}</TableCell>
              <TableCell>{detalles.id_producto}</TableCell>
              <TableCell>{detalles.cantidad}</TableCell>
              <TableCell>{detalles.tipo}</TableCell>
              <TableCell>
                <button className="Azul" onClick={()=>obtenerID(detalles.id_producto)}>Más información</button>
              </TableCell>
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