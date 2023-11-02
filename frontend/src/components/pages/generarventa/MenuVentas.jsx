import React from "react";
import { useNavigate } from "react-router-dom";


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


    return(
        <main>
            <div className="Header">
                <h1>Módulo de Ventas</h1>
            </div>
            <div className="Opciones">
                <h3>Para vender productos:</h3>
                <button className="Azul" onClick={irProducto}>Buscar productos</button>
                <h3>Para registrar un plan:</h3>
                <button className="Azul" onClick={irPlan}>Buscar planes</button>
            </div>
        </main>
    )
}