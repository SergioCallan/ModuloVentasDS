import React, { useState } from "react";
import Sidebar from "../extras/Sidebar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { TableContainer, Paper, Table, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/MenuVentas.css"

export default function MenuVentas() {
    const navigate= useNavigate()
  // Producto o servicio
  const [MostrarProducto, setMostrarProducto] = useState(false);
  const [MostrarServicio, setMostrarServicio] = useState(false);

  // Dropdown Producto
  const [dropdownP, setDropdownP] = useState(false);
  const abrirCerrarDropdownP = () => {
    setDropdownP(!dropdownP);
  };

  // Dropdown Filtro Producto
  const [dropdownF, setDropdownF] = useState(false);
  const abrirCerrarDropdownF = () => {
    setDropdownF(!dropdownF);
  };

  // Dropdown Filtro Servicio
  const [dropdownFS, setDropdownFS] = useState(false);
  const abrirCerrarDropdownFS = () => {
    setDropdownFS(!dropdownFS);
  };

  // Tipo
  const [Tipo, setTipo] = useState("");
  const SelectProducto = () => {
    setTipo("Producto");
    setMostrarProducto(true);
    setMostrarServicio(false);
  };
  const SelectServicio = () => {
    setTipo("Servicio");
    setMostrarProducto(false);
    setMostrarServicio(true);
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

  // Filtro Servicio
  const [FiltroS, setFiltroS] = useState("");
  const SelectMegas = () => {
    setFiltroS("Megas");
    setMostrarMegas(true);
    setMostrarPrecioS(false);
  };
  const SelectPrecioS = () => {
    setFiltroS("Precio");
    setMostrarMegas(false);
    setMostrarPrecioS(true);
  };
  const [MostrarMegas, setMostrarMegas] = useState(false);
  const [MostrarPrecioS, setMostrarPrecioS] = useState(false);

  // Campos del filtro Producto
  const [Nombre, setNombre] = useState("");
  const [Marca, setMarca] = useState("");
  const [Modelo, setModelo] = useState("");
  const [PrecioMin, setPrecioMin] = useState("");
  const [PrecioMax, setPrecioMax] = useState("");

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

  // Filtros
  const Filtrar = async (e) => {
    e.preventDefault();
    try {
      if (Filtro === "Nombre") {
        const productoEspacios = encodeURIComponent(Nombre);
        const url1 = `http://localhost:3000/searchproduct/${productoEspacios}`;
        const response1 = await axios.get(url1);
        if (response1.data === null) {
          alert("No se encontro el producto");
        } else {
            setDatosP(response1.data);
        }
      } else if (Filtro === "Marca") {
        const url2 = `http://localhost:3000/searchbrand/${Marca}`;
        const response2 = await axios.get(url2);
        if (response2.data === null) {
          alert("No se encontro el producto");
        } else {
            setDatosP(response2.data);
        }
      } else if (Filtro === "Modelo") {
        const modeloespacios = encodeURIComponent(Modelo);
        const url3 = `http://localhost:3000/searchmodel/${modeloespacios}`;
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
        const url4 = `http://localhost:3000/searchprice/${intervaloP}`;
        const response4 = await axios.get(url4);
        if (response4.data.id === null) {
          alert("No se encontro el producto");
        } else {
          alert("Se llegó aquí");
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
    e.preventDefault
    navigate("/listaventas")
  }

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };
  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <main>
      <IconButton onClick={handleSidebarOpen} edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
      <div className="Header">
        <h1>Módulo de Ventas</h1>
      </div>
      <div className="Menu">
        <h2 className="h2">Seleccionar productos</h2>
        <h3>Tipo de venta: </h3>
        <Dropdown isOpen={dropdownP} toggle={abrirCerrarDropdownP}>
          <DropdownToggle caret className="DropdownP">
            {Tipo}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem divider />
            <DropdownItem onClick={() => SelectProducto()}>Producto</DropdownItem>
            <DropdownItem onClick={() => SelectServicio()}>Servicio</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <br />
        {MostrarProducto && (
          <div className="Productos">
            <h3>Filtrar por: </h3>
            <Dropdown isOpen={dropdownF} toggle={abrirCerrarDropdownF}>
              <DropdownToggle caret className="DropdownF">
                {Filtro}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem divider />
                <DropdownItem onClick={() => SelectNombre()}>Nombre del producto</DropdownItem>
                <DropdownItem onClick={() => SelectMarca()}>Marca</DropdownItem>
                <DropdownItem onClick={() => SelectModelo()}>Modelo</DropdownItem>
                <DropdownItem onClick={() => SelectPrecio()}>Precio</DropdownItem>
              </DropdownMenu>
            </Dropdown>
                {MostrarNombre && (
                <div>
                    <input type="text" className="input" name="NombreProducto" placeholder="Nombre del producto" onChange={changingNombre} value={Nombre}></input>
                </div>
                )}
                {MostrarMarca && (
                <div>
                    <input type="text" className="input" name="Marca" placeholder="Marca del producto" onChange={changingMarca} value={Marca}></input>
                </div>
                )}
                {MostrarModelo && (
                <div>
                    <input type="text" className="input" name="Modelo" placeholder="Modelo del producto" onChange={changingModelo} value={Modelo}></input>
                </div>
                )}
                {MostrarPrecio && (
                <div>
                    <input type="text" className="input" name="PrecioMin" placeholder="Precio minimo del producto" onChange={changingPrecioMin} value={PrecioMin}></input>
                    <input type="text" className="input" name="PrecioMax" placeholder="Precio maximo del producto" onChange={changingPrecioMax} value={PrecioMax}></input>
                </div>
                )}
                <button id="FilterProduct" className="Celeste" onClick={Filtrar}>
                Filtrar Producto
                </button>

            <div className="TablaProducto">
              <TablaProductos datos={datosP} />
            </div>
          </div>
          
        )}
        {MostrarServicio && (
          <div className="Servicio">
            <h3>Filtrar por: </h3>
            <Dropdown isOpen={dropdownFS} toggle={abrirCerrarDropdownFS}>
              <DropdownToggle caret className="DropdownFS">
                {FiltroS}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem divider />
                <DropdownItem onClick={() => SelectMegas()}>Megas</DropdownItem>
                <DropdownItem onClick={() => SelectPrecioS()}>Precio</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {MostrarMegas && (
              <div>
                <input type="text" name="Megas" placeholder="Megas"></input>
              </div>
            )}
            {MostrarPrecioS && (
              <div>
                <input type="number" name="PrecioSMin" placeholder="Precio minimo"></input>
                <input type="number" name="PrecioSMax" placeholder="Precio maximo"></input>
              </div>
            )}
          </div>
        )}
        <button id="Regresar" className="Rojo">
          Regresar
        </button>
        <button id="Continuar" className="Verde" onClick={Agregar}>
          Añadir Producto
        </button>
      </div>
    </main>
  );
}

function TablaProductos({ datos }) {
    const obtenerID=(id)=>{
        alert(`ID del producto seleccionado: ${id}`)
        localStorage.setItem("idProducto", id)
    }
    return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Almacenamiento</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Seleccionar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((productos, index) => (
            <TableRow key={index}>
              <TableCell>{productos.id}</TableCell>
              <TableCell>{productos.marca}</TableCell>
              <TableCell>{productos.modelo}</TableCell>
              <TableCell>{productos.color}</TableCell>
              <TableCell>{productos.almacenamiento}</TableCell>
              <TableCell>{productos.precio}</TableCell>
              <TableCell>
                <button className="Azul" onClick={()=>obtenerID(productos.id)}>Seleccionar producto</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}