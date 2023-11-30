import React, { useState, useEffect } from "react";
// import Sidebar from "../../extras/Sidebar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { TableContainer, Paper, Table, TableHead, TableBody, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "bootstrap/dist/css/bootstrap.min.css";
import { CabeceraModulo } from "../../extras/CabeceraModulo";
import '../../styles/BuscarPlan/BuscarPlan.css'
import { TCelda } from "../../styles/CeldaTablaPersonalizada";
export default function BuscarPlan(){
    const navigate= useNavigate()
    const [ID, setID]=useState("")
    const [dropdownF, setDropdownF] = useState(false);
    const abrirCerrarDropdownF = () => {
        setDropdownF(!dropdownF);
    };

    // Filtro Producto
    const [Filtro, setFiltro] = useState("");
    const [Tipo, setTipo]= useState("");
    const [Megas, setMegas]= useState("");
    const [Precio, setPrecio]= useState("");
    const [PrecioMin, setPrecioMin]= useState("");
    const [PrecioMax, setPrecioMax]= useState("");
    const SelectTipo = () => {
        setFiltro("Tipo");
        setMostrarTipo(true);
        setMostrarMegas(false);
        setMostrarPrecio(false);
    };
    const SelectMegas = () => {
        setFiltro("Megas");
        setMostrarTipo(false);
        setMostrarMegas(true);
        setMostrarPrecio(false);
    };
    const SelectPrecio = () => {
        setFiltro("Precio");
        setMostrarTipo(false);
        setMostrarMegas(false);
        setMostrarPrecio(true);
    };
    const [MostrarTipo, setMostrarTipo] = useState(false);
    const [MostrarMegas, setMostrarMegas] = useState(false);
    const [MostrarPrecio, setMostrarPrecio] = useState(false);

    const Filtrar= async(e)=>{
        e.preventDefault();
        try{
            if(Filtro==="Tipo"){
                BuscarTipo()
            }
            else if(Filtro==="Megas"){
                BuscarMegas()
            }
            else if(Filtro==="Precio"){
                
            }
        }catch(error){
            console.error("Error al enviar la solicitud: ", error)
        }
    }
    const changingPlan= (event)=>{
        setTipo(event.target.value)
    }
    const changingMegas= (event)=>{
        setMegas(event.target.value)
    }
    const changingPrecioMax= (event)=>{
        setPrecioMax(event.target.value)
    }
    const changingPrecioMin= (event)=>{
        setPrecioMin(event.target.value)
    }

    const BuscarTipo= async()=>{
        const url= `https://modulo-ventas.onrender.com/searchplan/${Tipo}`
        const response= await axios.get(url)
        if(response===null){
            alert("No se encontró el producto")
        }
        else{
            setDatosP(response.data)
        }
    }

    const BuscarMegas= async()=>{
        const url= `https://modulo-ventas.onrender.com/searchmegas/${Megas}`
        const response= await axios.get(url)
        if(response===null){
            alert("No se encontró el producto")
        }
        else{
            setDatosP(response.data)
        }
    }


    const [datosP, setDatosP] = useState([]);

    //Paso a pagina
    const Agregar = async(e)=>{
      e.preventDefault()
      const id= localStorage.getItem("venta") 
      if(id=="" || id==null){
        const nuevaventa= uuidv4()
        localStorage.setItem("venta", nuevaventa)
      }
      const detalleventa={
        id_venta: localStorage.getItem("venta"),
        id_detalle: uuidv4(),
        id_producto: ID,
        cantidad: 1,
        id_garantia: 0,
        tiempo_garantia: 0,
        tipo: "Plan",
        coste_total: Precio
      }
      const url5= `https://modulo-ventas.onrender.com/adddetail`
      const response5= await axios.post(url5, detalleventa)
      localStorage.setItem("tipo", detalleventa.tipo)
      navigate('/listaventas')
    }

    return(
        <main>
            <CabeceraModulo></CabeceraModulo>
            <div className="Menu">
                <div className="contenedor-nombre-menu">
                <h2>Seleccionar planes</h2>
                </div>
                {/* <h3>Tipo de venta: Planes</h3> */}
                <div className="Planes">
                <div className="seccion-select-filtro">
                    <div className="subseccion-filtrar-por">
                    <h4>Filtrar por: </h4>
                    <Dropdown isOpen={dropdownF} toggle={abrirCerrarDropdownF}>
                        <DropdownToggle caret className="DropdownF">
                        {Filtro ? Filtro : 'Seleccionar filtro'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => SelectTipo()}>Tipo de plan</DropdownItem>
                            <DropdownItem onClick={() => SelectMegas()}>Megas</DropdownItem>
                            <DropdownItem onClick={() => SelectPrecio()}>Precio</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </div>
                    {MostrarTipo &&(
                        <div className="contenedor-filtro">
                            <label htmlFor="NombrePlan">Nombre del Producto:</label>
                            <input type="text" className="campo campo-nombre" name="NombrePlan" onChange={changingPlan} value={Tipo}></input>
                        </div>
                    )}
                    {MostrarMegas &&(
                        <div className="contenedor-filtro">
                            <label htmlFor="Megas">Cantidad de Megas:</label>
                            <input type="text" className="campo campo-min" name="Megas" onChange={changingMegas} value={Megas}></input>
                        </div>
                    )}
                    {MostrarPrecio && (
                    <div className="contenedor-filtro">
                        <label htmlFor="PrecioMin">Precio minimo:</label> 
                        <input type="text" className="campo campo-min" name="PrecioMin" onChange={changingPrecioMin} value={PrecioMin}></input>
                        <label htmlFor="PrecioMax">Precio maximo:</label>
                        <input type="text" className="campo campo-max" name="PrecioMax" onChange={changingPrecioMax} value={PrecioMax}></input>
                    </div>
                    )}
                    {Filtro && <button className="btn-filtrar" onClick={Filtrar}>
                    Filtrar Plan(es)
                    </button>}
                    </div>

                    <TablaP datos={datosP} setID={setID} setPrecio={setPrecio}/>
                    
                </div>

                <div className="capsula contenedor-btns">
                <button id="Regresar" className="Rojo btn-estructura">Regresar</button>
                <button id="Continuar" className="Verde btn-estructura" onClick={Agregar}>Continuar</button>
                </div>

            </div>
        </main>
    )
}

function TablaP({datos, setID, setPrecio}){
    const obtenerDatosPlan=(tipo, megas, id, precio)=>{
        alert(`Plan seleccionado: ${tipo} de ${megas} megas`)
        localStorage.setItem("montoplan", precio)
        localStorage.setItem("idplan", id)
        setID(id)
        setPrecio(precio)
    }
    return(
        <TableContainer component={Paper} sx={{maxHeight:'300px', maxWidth: '70vw',marginBottom: '3vh'}}>
      <Table>
        <TableHead component={Paper} sx={{position:'sticky', top:'0px'}}>
          <TableRow>
            <TCelda>ID</TCelda>
            <TCelda>Tipo</TCelda>
            <TCelda>Megas</TCelda>
            <TCelda>Precio</TCelda>
            <TCelda>Estado</TCelda>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((planes, index) => (
            <TableRow key={index}>
              <TCelda>{planes.id_plan}</TCelda>
              <TCelda>{planes.tipo}</TCelda>
              <TCelda>{planes.megas}</TCelda>
              <TCelda>{planes.precio}</TCelda>
              <TCelda>{planes.estado}</TCelda>
              <TCelda>
                <button className="Azul btn-seleccionar-producto" onClick={()=>obtenerDatosPlan(planes.tipo, planes.megas, planes.id_plan, planes.precio)}>Seleccionar producto</button>
              </TCelda>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}