import React, {useState} from "react"
import Sidebar from "../../extras/Sidebar"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios'
import "../../styles/Buscarcliente.css"
import {useNavigate} from 'react-router-dom'


export default function BuscarCliente(){
    const navigate= useNavigate()
    //Clientes
    const [DNI, setDNI]= useState("")
    const [Nombre, setNombre]= useState("")
    const [Apellido, setApellido]= useState("")
    const [Correo, setCorreo]= useState("")
    //Para boton
    const [inputDisabled, setInputDisabled]= useState(false)

    //Procesos con DNI
    const changingDNI= (event)=>{
        setDNI(event.target.value)
    }
    const buscarDNI= async(e)=>{
        e.preventDefault();
        try{
            const dni= DNI
            const url0= `http://localhost:4000/searchdni/${dni}`
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
                localStorage.setItem("dnicliente", DNI)
            }
        }catch(error){
            console.error("Error al enviar la solicitud: ", error)
        }
    }

    const Confirmar=()=>{
        setInputDisabled(true)
    }

    const Cancelar=()=>{
        setInputDisabled(false)
        setDNI("")
        setNombre("")
        setApellido("")
        setCorreo("")
        localStorage.removeItem("dnicliente")
    }

    const Avanzar=()=>{
        //Agregar el local Storage para el DNI
        navigate("/menuventas")
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
                
                    <div className="Clientes_Busqueda">
                        <h2>Seleccionar Cliente</h2>
                        <div className="Clientes_DNI">
                            <input type="text" className="input" name="DNI" placeholder="DNI" onChange={changingDNI} disabled={inputDisabled} required value={DNI}></input>
                            
                            <button id="Verify" className="Celeste" onClick={buscarDNI}>Buscar Cliente</button> <br/>
                            
                        </div>
                        
                    </div>
                    <br></br>
                    
                    <div className="Clientes_Data">
                        <h2>Datos del cliente</h2>
                        <div className="Clientes_Info">
                            <input type="text" className="inputDisabled" name="Nombres" placeholder="Nombre(s)" disabled required value={Nombre}></input>
                            <input type="text" className="inputDisabled" name="Telefono" placeholder="Teléfono" disabled required value={Apellido}></input>
                            <br></br>
                            <input type="text" className="inputDisabled" name="Apellidos" placeholder="Apellido(s)" disabled required value={Apellido}></input>
                            <input type="email" className="inputDisabled" name="Correo" placeholder="Correo" disabled required value={Correo}></input>
                            <br></br>
                            <button id="Cancel" className="Rojo" onClick={Cancelar}>Cancelar busqueda</button>
                            <button id="Confirm" className="Verde" onClick={Confirmar}>Confirmar Cliente</button>
                        </div>
                    </div>
                    <br/>
                    <button id= "AvanzarSeleccion" className="Verde" onClick={Avanzar}>Seleccionar productos</button>
                </div>
            </main>
        </body>
    )
}
