import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { CabeceraModulo } from "../../extras/CabeceraModulo";
import '../../styles/controlarFacturacion/facturacion.css'

export default function ObservarFacturas() {
  const [factura, setFactura] = useState([]);
  const [dni, setDNI] = useState(localStorage.getItem("dnicliente"));
  const [facturasPendientes, setFacturasPendientes] = useState([]);
  const navigate= useNavigate()
  const ActualizarFactura = async (e) => {
    e.preventDefault();
    try {
      const dni_cliente = dni;
      const url = `https://modulo-ventas.onrender.com/searchbilldni/${dni_cliente}`;
      const response = await axios.get(url);
      if (response.data === null) {
        alert("No se encontró al cliente");
        setDNI("");
        setFactura([]);
        setFacturasPendientes([]);
      } else {
        const todasLasFacturas = response.data;
        setFactura(todasLasFacturas);
        const facturasPendientes = todasLasFacturas.filter(
          (factura) => factura.estado === "Pendiente"
        );
        setFacturasPendientes(facturasPendientes);
      }
    } catch (error) {
      console.error("Error al buscar la factura:", error);
    }
  }

  const verInfo = async (id_factura) => {
    localStorage.setItem("idfactura", id_factura);
    navigate("/operaciones")
    // Utiliza Navigate o la lógica de navegación adecuada aquí
  };

  return (
    <div>
      <CabeceraModulo></CabeceraModulo>
      <div className="buscador">
        <h3>DNI del cliente:</h3>
        <h3>{dni}</h3>
        <button onClick={ActualizarFactura}>Actualizar lista de facturas</button>
      </div>
      <button className="btn-regresar" onClick={()=>{navigate('/menuventas')}}>Regresar</button>

      <div className="facturacion">
        <h1>Facturación</h1>
        <h2>Facturas Pendientes</h2>
        <GrupoFacturas facturas={facturasPendientes} verInfo={verInfo} />
        <h2>Facturas Pagadas</h2>
        <GrupoFacturas
          facturas={factura.filter((factura) => factura.estado === "Pagado")}
          verInfo={verInfo}
        />
      </div>
    </div>
  );
}

const FacturaIndividual = ({ factura, verInfo }) => {
  return (
    <div className="factura-individual">
      <p>ID de la factura: {factura.id_factura}</p>
      <p>DNI del cliente: {factura.dni_cliente}</p>
      <p>Número de la línea: {factura.numero_linea}</p>
      <p>Monto pagado: {factura.precio}</p>
      <p>Fecha del pago: {factura.fecha_pago}</p>
      <p>Estado del pago: {factura.estado}</p>
      <button onClick={() => verInfo(factura.id_factura)}>Ver información</button>
    </div>
  );
};

const GrupoFacturas = ({ facturas, verInfo }) => {
  return (
    <div className="grupo-facturas">
      {facturas.map((factura, index) =>
        Array.isArray(factura) ? (
          <GrupoFacturas key={index} facturas={factura} verInfo={verInfo} />
        ) : (
          <FacturaIndividual key={factura.id_factura} factura={factura} verInfo={verInfo} />
        )
      )}
    </div>
  );
};
