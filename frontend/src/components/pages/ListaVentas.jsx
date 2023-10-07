import React, {useState} from "react";
import Sidebar from "../extras/Sidebar";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListaVentas(){



    return(
        <body>
            <main>
                <div className="Lista">
                    <h2>Lista de productos</h2>
                    

                    <button id="Cancelar" className="Rojo">Cancelar Venta</button>
                    <button id="AgregarP" className="Celeste">Añadir otro producto</button>
                    <button id="Registrar" className="Verde">Registrar Venta</button>
                </div>
            </main>
        </body>
    )
}