import {React, useState, useEffect} from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
              setDatos(await nuevoFiltro.tipo.buscarDatosSemana(Periodo1, Periodo2))
            }
            if(FiltroIntervalo=="Mes"){
              setDatos(await nuevoFiltro.tipo.buscarDatosMes(Periodo1, Periodo2))
            }
        } catch(error){
          console.log(error)
        }
        
    }

    const downloadPdfDocument = () => {
      const domElement = document.getElementById('tablaReporte');
    
      html2canvas(domElement, { scrollY: -window.scrollY }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', [canvas.width, canvas.height]);
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('reporte_ventas.pdf');
      });
    };
    
  


    


    const LimpiarTabla= async (e)=>{
      setDatos([])
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
                    <button onClick={LimpiarTabla}>Limpiar tabla</button>
                    <button onClick={downloadPdfDocument}>Imprimir reporte</button>

                </div>
                <div className="Tabla">
                    <TablaReporte datos={datos}/>
                </div>
                
            </body>
        </main>
    )
}

function TablaReporte({ datos }) {
  let acumulado=0;

  return (
    <TableContainer component={Paper} id="tablaReporte">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha de inicio</TableCell>
            <TableCell>Fecha de fin</TableCell>
            <TableCell>Cantidad generada</TableCell>
            <TableCell>Crecimiento</TableCell>
            <TableCell>Porcentaje de crecimiento</TableCell>
            <TableCell>Total generado hasta la fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((dato, index) => {
            // Calcular la cantidad acumulativa
            acumulado = parseFloat(acumulado)+ parseFloat(dato.total);

            return (
              <TableRow key={dato.start_date}>
                <TableCell>{dato.start_date}</TableCell>
                <TableCell>{dato.end_date}</TableCell>
                <TableCell>{dato.total}</TableCell>
                <TableCell>{index > 0 ? dato.total - datos[index - 1].total : 0}</TableCell>
                <TableCell>{index > 0 ? ((dato.total - datos[index - 1].total) / datos[index - 1].total) * 100 : 0}%</TableCell>
                {/* Mostrar la cantidad acumulativa */}
                <TableCell>{acumulado}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};