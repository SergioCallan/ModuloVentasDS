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
    alert("Funciona")
  }

  const AgregarProducto= async (e)=>{
    e.preventDefault();
    alert("Funciona")
  }

  const Registrar= async (e)=>{
    e.preventDefault();
    alert("Funciona")
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
  const obtenerID=(id_producto, tipo)=>{
    localStorage.setItem("idcompra", id_producto)
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
              <TableCell>
                <button className="Azul" onClick={()=>obtenerID(detalles.id_producto)}>Más información</button>
              </TableCell>
              <TableCell>
                <button className="Rojo">Eliminar de la lista</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}