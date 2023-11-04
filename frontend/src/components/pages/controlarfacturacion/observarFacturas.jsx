import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ObservarFacturas() {
  const [factura, setFactura] = useState([]);
  const [dni, setDNI] = useState("");
  const [facturasPendientes, setFacturasPendientes] = useState([]);

  const changingDNI = (event) => {
    setDNI(event.target.value);
  };

  const ActualizarFactura = async (e) => {
    e.preventDefault();
    try {
        const dni_cliente = dni;
        const url = `http://localhost:4000/searchbilldni/${dni_cliente}`;
        const response = await axios.get(url);
        if (response.data === null) {
            alert("No se encontró al cliente");
            setDNI("");
            setFactura([]);
            setFacturasPendientes([])
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
  };

  return (
    <main>
      <div className="Buscador">
        <h3>Ingrese el DNI del cliente: </h3>
        <input type="text" className="input" name="dni" placeholder="DNI" onChange={changingDNI} value={dni}/>
        <button onClick={ActualizarFactura}>Buscar Cliente</button>
      </div>
      <div className="facturacion">
            <h1>Facturación</h1>
            <h2>Facturas Pagadas</h2>
            <GrupoFacturas facturas={factura.filter((factura) => factura.estado === "Pagado")} />
            <h2>Facturas Pendientes</h2>
            <GrupoFacturas facturas={facturasPendientes} />
      </div>
    </main>
  );
}

const FacturaIndividual = ({ factura }) => {
  return (
    <div className="factura-individual">
      <p>ID de la factura: {factura.id_factura}</p>
      <p>DNI del cliente: {factura.dni_cliente}</p>
      <p>Número de la línea: {factura.numero_linea}</p>
      <p>Monto pagado: {factura.precio}</p>
      <p>Fecha del pago: {factura.fecha_pago}</p>
      <p>Estado del pago: {factura.estado}</p>
    </div>
  );
};

const GrupoFacturas = ({ facturas }) => {
  return (
    <div className="grupo-facturas">
      {facturas.map((factura, index) =>
        Array.isArray(factura) ? (
          <GrupoFacturas key={index} facturas={factura} />
        ) : (
            
          <FacturaIndividual key={factura.id_factura} factura={factura} />
        )
      )}
    </div>
  );
};