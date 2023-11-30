import { useNavigate } from "react-router-dom"
import { CabeceraModulo2 } from "../../extras/CabeceraModulo"
import '../../styles/InterfazPrincipal.css'
import { useState } from "react"

export const InterfazBase = () => {
    const [acceso,setAcceso]=useState(false)

    const navigate=useNavigate()
    return(
        <div>
            <CabeceraModulo2></CabeceraModulo2>
            <div className="menu-botones">
                <button className="btn-opcion" disabled={acceso} onClick={()=>navigate('/buscarcliente')}>Opciones ligadas al cliente</button>
                <button className="btn-opcion" disabled={acceso} onClick={()=>navigate('/')}>Agregar planes y productos</button>
                <button className="btn-opcion" disabled={acceso} onClick={()=>navigate('/reporte')}>Reportes</button>
            </div>
        </div>
    )
}