import React, {useState} from "react";
import Sidebar from "../navbars/Sidebar";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'


export default function MenuVentas(){
    
    //Dropdown
    const [dropdown, setDropdown]=useState(false)
    const abrirCerrarDropdown=()=>{
        setDropdown(!dropdown)
    }


    //Tipo
    const [Tipo, setTipo]= useState("")
    const SelectProducto=()=>{
        setTipo("Producto")
    }
    const SelectServicio=()=>{
        setTipo("Servicio")
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
                <div className="Productos">
                    <h2>Seleccionar productos</h2>
                    <h3>Tipo de producto: </h3>
                    <Dropdown isOpen={dropdown} toggle={abrirCerrarDropdown}>
                        <DropdownToggle caret className="Dropdown">
                                {Tipo}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Tipo de Venta</DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem onClick={()=>SelectProducto()}>Producto</DropdownItem>
                            <DropdownItem onClick={()=>SelectServicio()}>Servicio</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </main>
        </body>
    )
}