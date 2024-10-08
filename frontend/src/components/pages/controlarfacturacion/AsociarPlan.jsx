import React, { useState, useEffect } from "react";
import Sidebar from "../../extras/Sidebar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "bootstrap/dist/css/bootstrap.min.css";

export default function AsociarPlan(){
    const [Numero, setNumero]=useState("")
    const navigate= useNavigate()

    const changingNumero=(event)=>{
        setNumero(event.target.value)
    }

    const GenerarNumero= async(e)=>{
        e.preventDefault()
        const numAleatorio= Math.floor(900000000+Math.random() * 100000000)
        setNumero(numAleatorio)
    }

    const CrearFactura= async (e)=>{
        const factura={
            id_factura: uuidv4(),
            dni_cliente: localStorage.getItem("dnicliente"),
            numero_linea: Numero,
            precio: localStorage.getItem("montoplan"),
            fecha_pago: new Date(),
            estado: "Pendiente"
        }
        factura.fecha_pago.setMonth(factura.fecha_pago.getMonth() + 1);
        factura.fecha_pago = factura.fecha_pago.toISOString().split('T')[0];
        const url= "https://modulo-ventas.onrender.com/createbill"
        const response= await axios.post(url, factura)
    }

    const AsociarNumero= async(e)=>{
        e.preventDefault()
        const linea={
            numero: Numero,
            plan: localStorage.getItem("idplan"),
            fecha_compra: new Date(),
            ultimo_pago: new Date(),
            monto_pago: localStorage.getItem("montoplan"),
            dni_cliente: localStorage.getItem("dnicliente"),
            estado: 0
        }
        const url= `https://modulo-ventas.onrender.com/associate`
        const response= await axios.post(url, linea)
        CrearFactura(linea)
        alert("Numero asociado exitosamente")
        localStorage.removeItem("venta")
        localStorage.removeItem("idfactura")
        localStorage.removeItem("idplan")
        localStorage.removeItem("tipo")
        localStorage.removeItem("montoplan")
        navigate('/menuventas')
    }

    return(
        <main>
            <div className="Header">
                <h1>Modulo de Ventas</h1>
            </div>
            <div className="Registro Plan">
                <h3>Si ya se cuenta con un número al cual asociar: </h3>
                <input type="text" className="input" name="numeroexistente" placeholder="Numero existente" onChange={changingNumero} value={Numero}></input>
                <h3>Si se desea generar un nuevo número para el cliente: </h3>
                <button onClick={GenerarNumero}>Click aqui</button>
                <input type="text" className="input" name="numeronuevo" placeholder="Nuevo numero" disabled value={Numero}></input>
                <button onClick={AsociarNumero}>Asociar Numero</button>
            </div>
        </main>
    )
}