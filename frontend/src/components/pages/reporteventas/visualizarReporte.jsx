import {React, useState, useEffect} from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow } from "@mui/material";



import "bootstrap/dist/css/bootstrap.min.css";


export default function VisualizarReporte(){
    const [datos, setDatos]= useState([])
    const [FiltroVenta, setFiltroVenta]= useState("")
    const [FiltroIntervalo, setFiltroIntervalo]= useState("")
    const [dropdownF, setDropdownF] = useState(false);
    const [dropdownI, setDropdownI]= useState(false);
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
      const SelectFactura = () => {
        setFiltroVenta("Factura");
      };

      const SelectDia = () => {
        setFiltroIntervalo("Dia");
      };
      const SelectSemana = () => {
        setFiltroIntervalo("Semana");
      };
      const SelectQuincena = () => {
        setFiltroIntervalo("Quincena");
      };
      const SelectMes = () => {
        setFiltroIntervalo("Mes");
      };


    const abrirCerrarDropdownI = () => {
        setDropdownI(!dropdownI);
    };

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
                            <DropdownItem onClick={()=>SelectFactura()}>Ganancias por facturas</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <h3>Fecha del periodo: </h3>
                    <input type="text" className="input" name="fecha1"></input>
                    <input type="text" className="input" name="fecha2"></input>
                    <h3>Tipo de intervalo: </h3>
                    <Dropdown isOpen={dropdownI} toggle={abrirCerrarDropdownI}>
                        <DropdownToggle caret className="Dropdown">
                            {FiltroIntervalo}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem divider/>
                            <DropdownItem onClick={()=> SelectDia()}>Ventas diarias</DropdownItem>
                            <DropdownItem onClick={()=> SelectSemana()}>Ventas semanales</DropdownItem>
                            <DropdownItem onClick={()=> SelectQuincena()}>Ventas quincenales</DropdownItem>
                            <DropdownItem onClick={()=> SelectMes()}>Ventas mensuales</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <button>Cargar tabla</button>
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
      </Table>
    </TableContainer>
    )
}