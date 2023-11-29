const pool= require ('../db')
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
import axios from "axios";
import FiltroState from "../actions/reportActions";

const createReport= async(req, res)=>{
    const {tipo, tiempo, periodo1, periodo2}= req.body
    const Filtro= new FiltroState()
    Filtro.actualizarDatos(tipo, tiempo, periodo1, periodo2)

    const dataTipo= 
}