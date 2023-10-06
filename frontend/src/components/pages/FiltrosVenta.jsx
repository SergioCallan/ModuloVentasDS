import React, {Component, useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

import Navbar from "../Navbar"

export default function FiltrosVenta(){
    

    return(
        <body>
            <main>
                <Navbar/>
                <div className="Header">
                    <h1>Módulo de Ventas</h1>
                </div>
                <div className="Filtros">
                    <input type="text" className="input" name="Nombre" placeholder="Nombre"></input>
                    <input type="text" className="input" name="Marca" placeholder="Marca"></input>
                    <input type="text" className="input" name="Modelo" placeholder="Modelo"></input>
                    <input type="text" className="input" name="Color" placeholder="Color"></input>
                    <input type="text" className="input" name="Almacenamiento" placeholder="Almacenamiento"></input>
                    <button id="filtrar" className="Verde">Filtrar</button>
                </div>
            </main>
        </body>
    )
}