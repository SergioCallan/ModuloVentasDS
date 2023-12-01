import { IconButton} from "@mui/material"
import Sidebar from "./Sidebar"
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import './CabeceraModulo.css'

export const CabeceraModulo = ({lock}) => {
   const { sidebarOpen,handleSidebarClose,handleSidebarOpen } = useSidebar()

    return (
        <div className="Header">
                    <IconButton className="contenedor-acordeon" onClick={handleSidebarOpen} edge="start" color="inherit" aria-label="menu">
                        <MenuIcon className="icono-acordeon"/>
                    </IconButton>
    
                    <Sidebar className="Menu-lateral-desplegable" open={sidebarOpen} onClose={handleSidebarClose} lock={lock}/>

                    <div className="Contenedor-Nombre-Modulo">
                    <h1 className="Nombre-Modulo">Módulo de Ventas</h1>
                    </div> 
                </div>
    )
}

export const CabeceraModulo2 = () => {
     return (
         <div className="Header">
                     <div className="Contenedor-Nombre-Modulo">
                     <h1 className="Nombre-Modulo">Módulo de Ventas</h1>
                     </div> 
                 </div>
     )
 }

const useSidebar = () => {
const [sidebarOpen, setSidebarOpen] = useState(false);

 const handleSidebarOpen = () => {
        setSidebarOpen(true)
}

const handleSidebarClose = () => {
        setSidebarOpen(false)
}

return {sidebarOpen:sidebarOpen,handleSidebarClose:handleSidebarClose,handleSidebarOpen:handleSidebarOpen}
}
