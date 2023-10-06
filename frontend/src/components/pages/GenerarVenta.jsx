import React, {Component, useState} from "react"
import Sidebar from "../extras/Sidebar"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios'


export default function GenerarVenta(){
    //Clientes
    const [DNI, setDNI]= useState("")
    const [Nombre, setNombre]= useState("")
    const [Apellido, setApellido]= useState("")
    const [Correo, setCorreo]= useState("")
    //Para ventas
    const [Tipo, setTipo]= useState("")
    const [ID, setID]= useState("")
    const [Precio, setPrecio]= useState("")
    //Producto
    const [Producto, setProducto]= useState("")
    const [Color, setColor]= useState("")

    //Procesos con DNI
    const changingDNI= (event)=>{
        setDNI(event.target.value)
    }
    const buscarDNI= async(e)=>{
        e.preventDefault();
        try{
            const dni= DNI
            const url0= `http://localhost:3000/searchdni/${dni}`
            const response0= await axios.get(url0)
            
            if(response0.data.nombres==null){
                alert("No se encontro el cliente")
                setDNI("")
                setNombre("")
                setApellido("")
                setCorreo("")
            }
            else{
                setNombre(response0.data.nombres)
                setApellido(response0.data.apellidos)
                setCorreo(response0.data.email)
            }
        }catch(error){
            console.error("Error al enviar la solicitud: ", error)
        }
    }




    //Sidebar
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleSidebarOpen = () => {
        setSidebarOpen(true);
    };
    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    return(
        <body>
            <main>
                <IconButton onClick={handleSidebarOpen} edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
                <div className="Header">
                    <h1>Módulo de Ventas</h1>
                </div>
                <div className="Clientes">
                    <h2>Cliente</h2>
                        <div className="Clientes_Data">
                            <input type="text" className="input" name="DNI" placeholder="DNI" onChange={changingDNI} required value={DNI}></input>
                            <input type="text" className="inputDisabled" name="Nombres" placeholder="Nombre(s)" disabled required value={Nombre}></input>
                            <button id="Verify" className="Celeste" onClick={buscarDNI}>Verificar Cliente</button> <br/>
                            <input type="text" className="inputDisabled" name="Apellidos" placeholder="Apellido(s)" disabled required value={Apellido}></input>
                            <input type="text" className="inputDisabled" name="Correo" placeholder="Correo" disabled required value={Correo}></input>
                            <button id="Confirm" className="Verde">Confirmar Cliente</button> <br/>
                        </div>
                </div>
                <div className="ProductoServicio">
                    <button id="Producto">Vender celular</button>
                    <button id="Servicio">Vender una plan</button>
                </div>
                
            </main>
        </body>
    )
}
