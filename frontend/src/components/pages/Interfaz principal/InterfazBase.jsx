import { useNavigate } from "react-router-dom"
import { CabeceraModulo2 } from "../../extras/CabeceraModulo"
import '../../styles/InterfazPrincipal.css'
import { useRef, useState } from "react"
import { verificacion } from "./verificarClaveAdmin"

export const InterfazBase = () => {
    // al ser la propiedad disabled
    // esta aparentemente invertido los valores de true y false 
    
    const [isDisabled,setDisabled]=useState(true)
    const inputpswd = useRef(null)
    const navigate=useNavigate()

    const verificar = () => {
        const clave = inputpswd.current.value
        const result = verificacion({clave:clave})
        if(result){
            alert("Clave de administrador incorrecta o invalida")
            return
        } 

        setDisabled(result)
    }

    return(
        <div>
            <CabeceraModulo2></CabeceraModulo2>
            <div className="sector-clave">
            <label htmlFor="clave">Clave del Administrador: </label>
            <form >
            <input ref={inputpswd} type="password" name="clave"/>
            </form>
            <button onClick={verificar}>Confirmar</button>
        </div>

            <div className="menu-botones">
                <button className="btn-opcion" onClick={()=>navigate('/buscarcliente')}>Opciones ligadas al cliente</button>
                <button className="btn-opcion" disabled={isDisabled} onClick={()=>navigate('/')}>Agregar planes y productos</button>
                <button className="btn-opcion" disabled={isDisabled} onClick={()=>navigate('/reporte')}>Reportes</button>
            </div>
        </div>
    )
}