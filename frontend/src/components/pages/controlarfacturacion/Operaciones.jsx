import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FacturaState from './estados';

const Operaciones = () => {
  const [factura, setFactura] = useState(new FacturaState());
  const [estado, setEstado]= useState("")

  const buscarFactura = async () => {
    const idfactura = localStorage.getItem("idfactura");
    const url = `https://modulo-ventas.onrender.com/searchbillid/${idfactura}`;
    try {
      const response = await axios.get(url);
      const nuevaFactura = new FacturaState();
      nuevaFactura.actualizarDatos(idfactura, response.data.precio, response.data.estado);
      setFactura(nuevaFactura);
      setEstado(response.data.estado)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    buscarFactura();
  }, []);

  return (
    <div>
      <p>Factura</p>
      <p>ID: {factura.id}</p>
      <p>Precio: {factura.precio}</p>
      <p>Estado: {estado}</p>
      <button onClick={() => factura.pagar()}>Pagar</button>
      <button onClick={() => factura.suspender()}>Suspender</button>
      <button onClick={() => factura.cancelar()}>Cancelar</button>
    </div>
  );
};

export default Operaciones;
