import React, {useState} from "react";
import Sidebar from "../extras/Sidebar";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'

//

export default function MenuVentas(){
    
    //Dropdown Producto
    const [dropdownP, setDropdownP]=useState(false)
    const abrirCerrarDropdownP=()=>{
        setDropdownP(!dropdownP)
    }
    //Dropdown Filtro
    const [dropdownF, setDropdownF]=useState(false)
    const abrirCerrarDropdownF=()=>{
        setDropdownF(!dropdownF)
    }


    //Tipo
    const [Tipo, setTipo]= useState("")
    const SelectProducto=()=>{
        setTipo("Producto")
    }
    const SelectServicio=()=>{
        setTipo("Servicio")
    }

    //Filtro
    const [Filtro, setFiltro]= useState("")
    const SelectNombre=()=>{
        setFiltro("Nombre")
        setMostrarNombre(true)
        setMostrarMarca(false)
        setMostrarModelo(false)
        setMostrarPrecio(false)
    }
    const SelectMarca=()=>{
        setFiltro("Marca")
        setMostrarNombre(false)
        setMostrarMarca(true)
        setMostrarModelo(false)
        setMostrarPrecio(false)
    }
    const SelectModelo=()=>{
        setFiltro("Modelo")
        setMostrarNombre(false)
        setMostrarMarca(false)
        setMostrarModelo(true)
        setMostrarPrecio(false)
    }
    const SelectPrecio=()=>{
        setFiltro("Precio")
        setMostrarNombre(false)
        setMostrarMarca(false)
        setMostrarModelo(false)
        setMostrarPrecio(true)
    }
    const [MostrarNombre, setMostrarNombre]= useState(false)
    const [MostrarMarca, setMostrarMarca]= useState(false)
    const [MostrarModelo, setMostrarModelo]= useState(false)
    const [MostrarPrecio, setMostrarPrecio]= useState(false)

    //Campos del filtro
    const [Nombre, setNombre]= useState("")
    const [Marca, setMarca]= useState("")
    const [Modelo, setModelo]= useState("")
    const [PrecioMin, setPrecioMin]= useState("")
    const [PrecioMax, setPrecioMax]= useState("")

    const changingNombre=(event)=>{
        setNombre(event.target.value)
    }
    //Filtrar

    const Filtrar= async(e)=>{
        e.preventDefault()
        try{
            const productoEspacios= encodeURIComponent(Nombre)
            const url1= `http://localhost:3000/searchproduct/${productoEspacios}`
            const response1= await axios.get(url1)
            if(response1.data.id==null){
                alert("No se encontro el producto")
            }
            else{
                alert("Se llego aqui")
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
                <div className="Menu">
                    <h2>Seleccionar productos</h2>
                    <h3>Tipo de venta: </h3>
                    <Dropdown isOpen={dropdownP} toggle={abrirCerrarDropdownP}>
                        <DropdownToggle caret className="DropdownP">
                                {Tipo}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem divider/>
                            <DropdownItem onClick={()=>SelectProducto()}>Producto</DropdownItem>
                            <DropdownItem onClick={()=>SelectServicio()}>Servicio</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <br/>
                    <div className="Productos">
                        <h3>Filtrar por: </h3>
                        <Dropdown isOpen={dropdownF} toggle={abrirCerrarDropdownF}>
                            <DropdownToggle caret className="DropdownF">
                                    {Filtro}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem divider/>
                                <DropdownItem onClick={()=>SelectNombre()}>Nombre del producto</DropdownItem>
                                <DropdownItem onClick={()=>SelectMarca()}>Marca</DropdownItem>
                                <DropdownItem onClick={()=>SelectModelo()}>Modelo</DropdownItem>
                                <DropdownItem onClick={()=>SelectPrecio()}>Precio</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {MostrarNombre &&(
                            <div>
                                <input type="text" name="NombreProducto" placeholder="Nombre del producto" onChange={changingNombre} value={Nombre}></input>
                            </div>
                        )}
                        {MostrarMarca &&(
                            <div>
                                <input type="text" name="Marca" placeholder="Marca del producto" value={Marca}></input>
                            </div>
                        )}
                        {MostrarModelo &&(
                            <div>
                                <input type="text" name="Modelo" placeholder="Modelo del producto" value={Modelo}></input>
                            </div>
                        )}
                        {MostrarPrecio &&(
                            <div>
                                <input type="text" name="PrecioMin" placeholder="Precio minimo del producto" value={PrecioMin}></input>
                                <input type="text" name="PrecioMin" placeholder="Precio maximo del producto" value={PrecioMax}></input>
                            </div>
                        )}
                        <button id="FilterProduct" className="Celeste" onClick={Filtrar}>Filtrar Producto</button>
                        <div className="TablaProducto">
                            
                        </div>
                    </div>
                    <div className="Servicio">

                    </div>
                </div>
            </main>
        </body>
    )
}