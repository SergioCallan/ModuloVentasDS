import {React, useState, useEffect} from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import FiltroState from "./estadoReporteVenta";


import "bootstrap/dist/css/bootstrap.min.css";


export default function VisualizarReporte(){
    const [datos, setDatos]= useState([])
    const [Filtro, setFiltro]= useState(new FiltroState())
    const [FiltroVenta, setFiltroVenta]= useState("")
    const [FiltroIntervalo, setFiltroIntervalo]= useState("")
    const [Periodo1, setPeriodo1]= useState("")
    const [Periodo2, setPeriodo2]= useState("")
    const [dropdownF, setDropdownF] = useState(false);
    const [dropdownI, setDropdownI]= useState(false);

    const changingPeriodo1=(event)=>{
      setPeriodo1(event.target.value)
    }
    const changingPeriodo2=(event)=>{
      setPeriodo2(event.target.value)
    }

    const abrirCerrarDropdownF = () => {
        setDropdownF(!dropdownF);
    };

    const SelectGeneral = () => {
        setFiltroVenta("General");
      };
      const SelectEquipo = () => {
        setFiltroVenta("Equipo");
      };
      const SelectPlan = () => {
        setFiltroVenta("Plan");
      };

      const SelectDia = () => {
        setFiltroIntervalo("Dia");
      };
      const SelectSemana = () => {
        setFiltroIntervalo("Semana");
      };
      const SelectMes = () => {
        setFiltroIntervalo("Mes");
      };


    const abrirCerrarDropdownI = () => {
        setDropdownI(!dropdownI);
    };

    const CargarTabla= async(e)=>{
        e.preventDefault();
        try{
            const nuevoFiltro= new FiltroState()
            nuevoFiltro.actualizarDatos(FiltroVenta, FiltroIntervalo, Periodo1, Periodo2)
            setFiltro(nuevoFiltro)
            if(FiltroIntervalo=="Dia"){
              setDatos(await nuevoFiltro.tipo.buscarDatosDia(Periodo1, Periodo2))
            }
            if(FiltroIntervalo=="Semana"){
              result= Filtro.tipo.buscarDatosSemana(Periodo1, Periodo2)
            }
            if(FiltroIntervalo=="Mes"){
              result= Filtro.tipo.buscarDatosMes(Periodo1, Periodo2)
            }
        } catch(error){
          console.log(error)
        }
        
    }

    return(
        <main>
            <body>
                <div className="Header">
                    <h2>Modulo de ventas</h2>
                </div>
                <div className="Filtros">
                    <h3>Filtrar: </h3>
                    <Dropdown isOpen={dropdownF} toggle={abrirCerrarDropdownF}>
                        <DropdownToggle caret className="Dropdown">
                            {FiltroVenta}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem divider/>
                            <DropdownItem onClick={()=> SelectGeneral()}>Ventas generales</DropdownItem>
                            <DropdownItem onClick={()=> SelectEquipo()}>Venta de equipos</DropdownItem>
                            <DropdownItem onClick={()=>SelectPlan()}>Venta de planes</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <h3>Fecha del periodo (Formato YYYY-MM-DD): </h3>
                    <input type="text" className="input" onChange={changingPeriodo1} value={Periodo1}></input>
                    <input type="text" className="input" onChange={changingPeriodo2} value={Periodo2}></input>
                    <h3>Tipo de intervalo: </h3>
                    <Dropdown isOpen={dropdownI} toggle={abrirCerrarDropdownI}>
                        <DropdownToggle caret className="Dropdown">
                            {FiltroIntervalo}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem divider/>
                            <DropdownItem onClick={()=> SelectDia()}>Ventas diarias</DropdownItem>
                            <DropdownItem onClick={()=> SelectSemana()}>Ventas semanales</DropdownItem>
                            <DropdownItem onClick={()=> SelectMes()}>Ventas mensuales</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <button onClick={CargarTabla}>Cargar tabla</button>
                </div>
                <div className="Tabla">
                    <TablaReporte datos={datos}/>
                    {/*Poner tabla y calculos*/}
                </div>
                <div className="Graficos">
                    {/*Colocar los graficos */}
                </div>
                <div className="Opciones">
                    <button>Imprimir reporte</button>
                </div>
            </body>
        </main>
    )
}

function TablaReporte({datos}){
    return(
        <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Cantidad generada</TableCell>
            <TableCell>Crecimiento</TableCell>
            <TableCell>Porcentaje de crecimiento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((dato) => (
            <TableRow key={dato.fecha}>
              <TableCell>{dato.fecha}</TableCell>
              <TableCell>{dato.total}</TableCell>
              {/* Aquí puedes calcular crecimiento y porcentaje de crecimiento si es necesario */}
              <TableCell>{/* dato.crecimiento */}</TableCell>
              <TableCell>{/* dato.porcentajeCrecimiento */}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}