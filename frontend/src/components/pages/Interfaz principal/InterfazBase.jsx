import { useNavigate } from "react-router-dom"
import { CabeceraModulo2 } from "../../extras/CabeceraModulo"
import '../../styles/InterfazPrincipal.css'

export const InterfazBase = () => {
    const navigate=useNavigate()
    return(
        <div>
            <CabeceraModulo2></CabeceraModulo2>
            <div className="menu-botones">
                <button className="btn-opcion" onClick={()=>navigate('/buscarcliente')}>Opciones ligadas al cliente</button>
                <button className="btn-opcion" onClick={()=>navigate('/')}>Agregar planes y productos</button>
                <button className="btn-opcion" onClick={()=>navigate('#')}>Reportes</button>
            </div>
        </div>
    )
}