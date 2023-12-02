import React from "react";
import { useNavigate } from "react-router-dom";
import { CabeceraModulo } from "../../extras/CabeceraModulo.jsx";
import '../../styles/EstilosGenerarVenta/MenuVentas.css'

export default function MenuVentas(){
    const navigate= useNavigate()
    
    const irProducto= async(e)=>{
        e.preventDefault
        navigate('/buscarproducto')
        // console.log(e.target.innerHTML)
    }

    const irPlan= async(e)=>{
        e.preventDefault
        navigate('/buscarplan')
    }

    const irFacturacion= async(e)=>{
        e.preventDefault
        navigate('/observarfacturas')
    }

    return(
        <div>
            <CabeceraModulo></CabeceraModulo>
            <div className="Opciones">
                <h3>Para vender productos:</h3>
                <button className="Azul" onClick={irProducto}>Seleccionar productos</button>
                <h3>Para asociarse a un plan:</h3>
                <button className="Azul" onClick={irPlan}>Seleccionar planes de internet</button>
                <h3>Estado de la(s) factura(s): </h3>
                <button className="Azul" onClick={irFacturacion}>Ver facturas</button>
                {/* <h3>Ver lineas asociadas al cliente: </h3>
                <button className="Azul">Lineas</button> */}
            </div>
        </div>
    )
}