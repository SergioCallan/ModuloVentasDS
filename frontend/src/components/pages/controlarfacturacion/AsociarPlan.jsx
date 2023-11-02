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
import "../../styles/MenuVentas.css"

export default function AsociarPlan(){
    const [Numero, setNumero]=useState("")


    const GenerarNumero= async(e)=>{
        e.preventDefault()
        const numAleatorio= Math.floor(900000000+Math.random() * 100000000)
        setNumero(numAleatorio)
    }

    const AsociarNumero= async(e)=>{
        e.preventDefault()
        const linea={
            numero: Numero,
            plan: "Pro",
            fecha_compra: "2023-11-02",
            fecha_pago: "2023-12-02",
            monto_pago: 70,
            dni_cliente: "70911900",
            estado: 0
        }
        const url= `http://localhost:4000/associate`
        const response= await axios.post(url, linea)
        console.log(response.data)
    }

    return(
        <main>
            <div className="Header">
                <h1>Modulo de Ventas</h1>
            </div>
            <div className="Registro Plan">
                <h3>Si ya se cuenta con un número al cual asociar: </h3>
                <input type="text" className="input" name="numeroexistente" placeholder="Numero existente"></input>
                <h3>Si se desea generar un nuevo número para el cliente: </h3>
                <button onClick={GenerarNumero}>Click aqui</button>
                <input type="text" className="input" name="numeronuevo" placeholder="Nuevo numero" disabled value={Numero}></input>
                <button onClick={AsociarNumero}>Asociar Numero</button>
            </div>
        </main>
    )
}