import {React, useState, useEffect} from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import { CabeceraModulo } from "../../extras/CabeceraModulo";
import '../../styles/Reportes/reporte.css'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import FiltroState from "./estadoReporteVenta";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


export default function VisualizarReporte(){
    const navigate=useNavigate()
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
    
      // Calcular la altura total para cubrir el encabezado y la tabla
      const totalHeight = domElement.clientHeight + 30; // Sumar 30 para dejar espacio para el encabezado
    
      // Crear una nueva instancia de jsPDF
      const pdf = new jsPDF('l', 'mm', [domElement.clientWidth, totalHeight]);
    
      // Definir el tamaño de la fuente para el encabezado
      const fontSize = 32;
    
      // Agregar información de selección en el encabezado con letras más grandes
      pdf.setFontSize(fontSize);
      pdf.text(`Selección de Venta: ${FiltroVenta}`, 10, 10);
      pdf.text(`Fecha del Periodo: ${Periodo1} - ${Periodo2}`, 10, 20);
    
      // Restablecer el tamaño de la fuente para el contenido de la tabla
      pdf.setFontSize(24);
    
      // Convertir la tabla a imagen y agregarla al documento PDF
      html2canvas(domElement, { scrollY: -window.scrollY }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 30, canvas.width, canvas.height);
    
        // Guardar el documento con un nombre específico
        pdf.save('reporte_ventas.pdf');
      });
    };

    const LimpiarTabla= async (e)=>{
      setDatos([])
    }

    return(
        <main>
            <div>
                <CabeceraModulo/>
                < div className="contenedor-gestion-reportes">
                <div className="contenedor-nombre-menu">
                <h2>Reportes</h2>
                </div>

                <div className="Filtros">
                  <div className="seccion-filtro">
                    <h3>Filtrar: </h3>
                    <Dropdown isOpen={dropdownF} toggle={abrirCerrarDropdownF}>
                        <DropdownToggle caret className="Dropdown">
                            {FiltroVenta ? FiltroVenta : "Seleccionar Filtro"}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem divider/>
                            <DropdownItem onClick={()=> SelectGeneral()}>Ventas generales</DropdownItem>
                            <DropdownItem onClick={()=> SelectEquipo()}>Venta de equipos</DropdownItem>
                            <DropdownItem onClick={()=>SelectPlan()}>Venta de planes</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </div>

                    <h3>Fecha del periodo (Formato YYYY-MM-DD): </h3>
                    <div className="seccion-inputs">
                    <input type="text" className="input struct-input" onChange={changingPeriodo1} value={Periodo1}></input>
                    <input type="text" className="input struct-input" onChange={changingPeriodo2} value={Periodo2}></input>
                    </div>
                    <div className="seccion-filtro">
                    <h3>Tipo de intervalo: </h3>
                    <Dropdown isOpen={dropdownI} toggle={abrirCerrarDropdownI}>
                        <DropdownToggle caret className="Dropdown">
                            {FiltroIntervalo ? FiltroIntervalo : "Seleccionar Filtro"}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem divider/>
                            <DropdownItem onClick={()=> SelectDia()}>Ventas diarias</DropdownItem>
                            <DropdownItem onClick={()=> SelectSemana()}>Ventas semanales</DropdownItem>
                            <DropdownItem onClick={()=> SelectMes()}>Ventas mensuales</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </div>
                    <div className="btns-tabla">
                    <button className="btn-tabla btn-color2" onClick={CargarTabla}>Cargar tabla</button>
                    <button className="btn-tabla btn-color1" onClick={LimpiarTabla}>Limpiar tabla</button>
                    </div>
                </div>
               
                    <TablaReporte datos={datos}/>
               
                
                    <button className="btn-imprimir" onClick={downloadPdfDocument}>Imprimir reporte</button>

                    <div className='caja-btn'>
            <button className="btn-regresar" onClick={()=>{navigate('/principal')}}>Menu Principal</button>
                    </div>
                    
                
            </div>
            </div>
        </main>
    )
}

function TablaReporte({ datos }) {
  let acumulado=0;

  return (
    <TableContainer id = 'tablaReporte' component={Paper} sx={{maxHeight:'300px', maxWidth: '70vw',marginBottom: '3vh'}} >
      <Table>
        <TableHead component={Paper} sx={{position:'sticky', top:'0px'}}>
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
}