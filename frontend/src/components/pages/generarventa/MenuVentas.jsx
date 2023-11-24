import React from "react";
import { useNavigate } from "react-router-dom";
import { CabeceraModulo } from "../../extras/CabeceraModulo.jsx";
import '../../styles/EstilosGenerarVenta/MenuVentas.css'

export default function MenuVentas(){
    const navigate= useNavigate()
    
    const irProducto= async(e)=>{
        e.preventDefault
        navigate('/buscarproducto')
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
        <main>
            <CabeceraModulo></CabeceraModulo>
            <div className="Opciones">
                <h3>Para vender productos:</h3>
                <button className="Azul" onClick={irProducto}>Buscar productos</button>
                <h3>Para registrar un plan:</h3>
                <button className="Azul" onClick={irPlan}>Buscar planes</button>
                <h3>Para cobrar una factura: </h3>
                <button className="Azul" onClick={irFacturacion}>Ver facturas</button>
                <h3>Ver lineas asociadas al cliente: </h3>
                <button className="Azul">Lineas</button>
            </div>
        </main>
    )
}