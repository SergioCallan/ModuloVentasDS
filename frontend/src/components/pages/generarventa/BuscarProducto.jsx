import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {TCelda} from "../../styles/CeldaTablaPersonalizada";
import '../../styles/EstilosGenerarVenta/BuscarProducto.css'
import { CabeceraModulo } from "../../extras/CabeceraModulo.jsx";

export default function BuscarProducto() {
  const navigate= useNavigate()
  const [ID, setID]=useState("")
  // Dropdown Filtro Producto
  const [dropdownF, setDropdownF] = useState(false);
  const abrirCerrarDropdownF = () => {
    setDropdownF(!dropdownF);
  };

  // Filtro Producto
  const [Filtro, setFiltro] = useState("");
  const SelectNombre = () => {
    setFiltro("Nombre");
    setMostrarNombre(true);
    setMostrarMarca(false);
    setMostrarModelo(false);
    setMostrarPrecio(false);
  };
  const SelectMarca = () => {
    setFiltro("Marca");
    setMostrarNombre(false);
    setMostrarMarca(true);
    setMostrarModelo(false);
    setMostrarPrecio(false);
  };
  const SelectModelo = () => {
    setFiltro("Modelo");
    setMostrarNombre(false);
    setMostrarMarca(false);
    setMostrarModelo(true);
    setMostrarPrecio(false);
  };
  const SelectPrecio = () => {
    setFiltro("Precio");
    setMostrarNombre(false);
    setMostrarMarca(false);
    setMostrarModelo(false);
    setMostrarPrecio(true);
  };
  const [MostrarNombre, setMostrarNombre] = useState(false);
  const [MostrarMarca, setMostrarMarca] = useState(false);
  const [MostrarModelo, setMostrarModelo] = useState(false);
  const [MostrarPrecio, setMostrarPrecio] = useState(false);

  // Campos del filtro Producto
  const [Nombre, setNombre] = useState("");
  const [Marca, setMarca] = useState("");
  const [Modelo, setModelo] = useState("");
  const [Precio, setPrecio]= useState("");
  const [PrecioMin, setPrecioMin] = useState("");
  const [PrecioMax, setPrecioMax] = useState("");
  const [Cantidad, setCantidad] = useState("");
  const [Garantia, setGarantia] = useState("");
  const [TiempoG, setTiempoG] = useState("");

  const changingNombre = (event) => {
    setNombre(event.target.value);
  };
  const changingMarca = (event) => {
    setMarca(event.target.value);
  };
  const changingModelo = (event) => {
    setModelo(event.target.value);
  };
  const changingPrecioMin = (event) => {
    setPrecioMin(event.target.value);
  };
  const changingPrecioMax = (event) => {
    setPrecioMax(event.target.value);
  };
  const changingCantidad = (event) => {
    setCantidad(event.target.value);
  };
  const changingGarantia = (event) => {
    setGarantia(event.target.value);
  };

  const changingTiempoG = (event) => {
    setTiempoG(event.target.value);
  };

  // Filtros
  const Filtrar = async (e) => {
    e.preventDefault();
    try {
      if (Filtro === "Nombre") {
        const productoEspacios = encodeURIComponent(Nombre);
        const url1 = `https://modulo-ventas.onrender.com/searchproduct/${productoEspacios}`;
        const response1 = await axios.get(url1);
        if (response1.data === null) {
          alert("No se encontro el producto");
        } else {
            setDatosP(response1.data);
        }
      } else if (Filtro === "Marca") {
        const url2 = `https://modulo-ventas.onrender.com/searchbrand/${Marca}`;
        const response2 = await axios.get(url2);
        if (response2.data === null) {
          alert("No se encontro el producto");
        } else {
            setDatosP(response2.data);
        }
      } else if (Filtro === "Modelo") {
        const modeloespacios = encodeURIComponent(Modelo);
        const url3 = `https://modulo-ventas.onrender.com/searchmodel/${modeloespacios}`;
        const response3 = await axios.get(url3);
        if (response3.data === null) {
          alert("No se encontro el producto");
        } else {
          setDatosP(response3.data);
        }
      } else if (Filtro === "Precio") {
        const intervaloP = {
          preciomin: PrecioMin,
          preciomax: PrecioMax,
        };
        const url4 = `https://modulo-ventas.onrender.com/searchprice`;
        const response4 = await axios.get(url4, {params: intervaloP});
        if (response4.data.id === null) {
          alert("No se encontro el producto");
        } else {
          setDatosP(response4.data);
        }
      }
    } catch (error) {
      console.error("Error al enviar la solicitud: ", error);
    }
  };

  // Tablas
  const [datosP, setDatosP] = useState([]);

  //Paso a pagina
  const Agregar= async(e)=>{
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
      cantidad: Cantidad,
      id_garantia: Garantia,
      tiempo_garantia: TiempoG,
      tipo: "Celular",
      coste_total: 0
    }
    
    const costeTotal= await CalcularCoste(detalleventa.cantidad, Precio, detalleventa.id_garantia)
    detalleventa.coste_total = costeTotal;
    alert(costeTotal)
    const url5= `https://modulo-ventas.onrender.com/adddetail`
    const response5= await axios.post(url5, detalleventa)
    console.log(response5.data)
    localStorage.setItem("tipo", detalleventa.tipo) 
    navigate('/listaventas')
  }

  const CalcularCoste= async (cantidad, Precio, id_garantia)=>{
    let precioDetalle= cantidad* parseFloat(Precio)
    if(id_garantia>0){
      const url= `https://modulo-ventas.onrender.com/searchwarranty/${id_garantia}`
      const response= await axios.get(url)
      const precioGarantia= parseFloat(response.data.precio)
      precioDetalle+=precioGarantia
    }
    return precioDetalle
  }

  const Regresar= async(e)=>{
    e.preventDefault()
    navigate("/buscarcliente")
  }

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };
  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const BuscarGarantia= async(e)=>{
    e.preventDefault()
    const url= `https://modulo-ventas.onrender.com/searchwarranty/${Garantia}`
    const response= await axios.get(url)
    alert("La garantia cubre: "+response.data.porcentaje+"%")
    alert("Coste de la garantia: "+response.data.precio)
  }

  //Función para comprobar que haya un cliente
  useEffect(()=>{
    const dni= localStorage.getItem("dnicliente")
      if(dni==null || dni==""){
          navigate("/buscarcliente")
      }
  })

  return (
    <main>
      <CabeceraModulo></CabeceraModulo>
      <div className="Menu">
        <div className="contenedor-nombre-menu">
          <h2>Seleccionar productos</h2>
        </div>
        {/* <h4>Tipo de venta: Producto</h4> */}
          <div className="Productos">
            <div className="seccion-select-filtro">
              <div className="subseccion-filtrar-por">
            <h4>Filtrar productos por: </h4>
            <Dropdown isOpen={dropdownF} toggle={abrirCerrarDropdownF}>
              <DropdownToggle caret className="DropdownF">
                {Filtro ? Filtro : 'Seleccionar filtro'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem divider />
                <DropdownItem onClick={() => SelectNombre()}>Nombre del producto</DropdownItem>
                <DropdownItem onClick={() => SelectMarca()}>Marca</DropdownItem>
                <DropdownItem onClick={() => SelectModelo()}>Modelo</DropdownItem>
                <DropdownItem onClick={() => SelectPrecio()}>Precio</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </div>
                {MostrarNombre && (
                <div className="contenedor-filtro">
                  <label htmlFor="NombreProducto">Nombre del Producto:</label>
                  <input type="text" className="campo campo-nombre" name="NombreProducto" placeholder="Nombre" onChange={changingNombre} value={Nombre}></input>
                </div>
                )}
                {MostrarMarca && (
                <div className="contenedor-filtro">
                    <label htmlFor="Marca">Marca del Producto:</label>
                    <input type="text" className="campo campo-marca" name="Marca" placeholder="Marca" onChange={changingMarca} value={Marca}></input>
                </div>
                )}
                {MostrarModelo && (
                <div className="contenedor-filtro">
                    <label htmlFor="Modelo">Modelo del Producto:</label>
                    <input type="text" className="campo campo-modelo" name="Modelo" placeholder="Modelo" onChange={changingModelo} value={Modelo}></input>
                </div>
                )}
                {MostrarPrecio && (
                <div className="contenedor-precios">
                    <label htmlFor="PrecioMin">Precio minimo:</label> 
                    <input type="text" className="campo campo-min" name="PrecioMin" onChange={changingPrecioMin} value={PrecioMin}></input>
                    <label htmlFor="PrecioMax">Precio maximo:</label>
                    <input type="text" className="campo campo-max" name="PrecioMax" onChange={changingPrecioMax} value={PrecioMax}></input>
                </div>
                )}
                {Filtro && <button className="btn-filtrar" onClick={Filtrar}>
                Filtrar Producto(s)
                </button>}
                </div>

              <TablaProductos datos={datosP} setID={setID} setPrecio={setPrecio}/>

          </div>
        <div className="capsula">
        <label htmlFor="Cantidad">Cantidad del producto:</label>
        <input type="number" className="input input-small" name= "Cantidad" onChange={changingCantidad} required value={Cantidad}></input>
        <label htmlFor="Cantidad">unidad(es)</label>
        </div>
        <div className="capsula">
        <label htmlFor="Garantia">ID del Tipo de Garantia(%) :</label>
        <input type="text" className="input" name="Garantia" onChange={changingGarantia} required value={Garantia}></input>
        <button id="BuscarGarantia" className="Celeste btn-buscar-garantia" onClick={BuscarGarantia}>Buscar Garantia</button>
        </div>
        <div className="capsula">
        <label htmlFor="TiempoG">Tiempo a cubrir:</label>
        <input type="number" className="input input-small" name="TiempoG" onChange={changingTiempoG} required value={TiempoG}></input>
        <label htmlFor="TiempoG">mes(es)</label>
        </div>
        <div className="capsula contenedor-btns">
        <button id="Regresar" className="Rojo btn-estructura" onClick={Regresar}>
          Regresar
        </button>
        <button id="Continuar" className="Verde btn-estructura" onClick={Agregar}>
          Añadir Producto
        </button>
        </div>
      </div>
    </main>
  );
}

function TablaProductos({ datos, setID, setPrecio }) {
    const obtenerDatosProducto=(marca, modelo, idproducto, precio)=>{
      alert(`Producto seleccionado: ${marca} ${modelo}`)
      setID(idproducto)
      setPrecio(precio)
    }
    return (
    <TableContainer component={Paper} sx={{maxHeight:'300px', maxWidth: '70vw',marginBottom: '3vh'}}>
      <Table>
        <TableHead component={Paper} sx={{position:'sticky', top:'0px'}}>
          <TableRow>
            <TCelda>ID</TCelda>
            <TCelda>Marca</TCelda>
            <TCelda>Modelo</TCelda>
            <TCelda>Color</TCelda>
            <TCelda>Almacenamiento</TCelda>
            <TCelda>Precio</TCelda>
            <TCelda>Seleccionar</TCelda>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((productos, index) => (
            <TableRow key={index}>
              <TCelda>{productos.id_celular}</TCelda>
              <TCelda>{productos.marca}</TCelda>
              <TCelda>{productos.modelo}</TCelda>
              <TCelda>{productos.color}</TCelda>
              <TCelda>{productos.almacenamiento}</TCelda>
              <TCelda>{productos.precio}</TCelda>
              <TCelda>
                <button className="Azul" onClick={()=>obtenerDatosProducto(productos.marca, productos.modelo, productos.id_celular, productos.precio)}>Seleccionar producto</button>
              </TCelda>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}