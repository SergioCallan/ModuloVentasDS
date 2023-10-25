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
  const [datosventa, setDatosVenta] = useState([]);
  const navigate = useNavigate();

  // Función para cargar los datos de venta
  const cargarDatosVenta = async () => {
    
  };

  const Ventaregistro= async(e)=>{
    alert("Venta registrada")
  }

  useEffect(() => {
    cargarDatosVenta();
  }, []);

  // Función para eliminar un producto
  const eliminarID = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/delete/${id}`);
      // Actualizar la lista de datos después de eliminar
      cargarDatosVenta();
      console.log("Producto eliminado con ID:", id);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  //Función para comprobar que haya un cliente
  useEffect(()=>{
    const dnicliente= localStorage.getItem("dnicliente")
      if(dnicliente==null || dnicliente==""){
          navigate('/buscarcliente')
      }
  })

  return (
    <div>
      <Sidebar />
      <main>
        <div className="Header">
          <h1>Módulo de Ventas</h1>
        </div>
        <div className="Lista">
          <h2 className="h2">Lista de productos</h2>
          <TablaVenta datos={datosventa} eliminarID={eliminarID} />
          <button id="Cancelar" className="Rojo">
            Cancelar Venta
          </button>
          <button id="AgregarP" className="Celeste">
            Añadir otro producto
          </button>
          <button id="Registrar" className="Verde" onClick={Ventaregistro}>
            Registrar Venta
          </button>
        </div>
      </main>
    </div>
  );
}

function TablaVenta({ datos, eliminarID }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow >
              <TableCell>12345678</TableCell>
              <TableCell>Huawei P Smart 2019</TableCell>
              <TableCell>990.00</TableCell>
              <TableCell>
                <button className="Rojo" onClick={() => eliminarID(productos.id)}>
                  Retirar producto
                </button>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}