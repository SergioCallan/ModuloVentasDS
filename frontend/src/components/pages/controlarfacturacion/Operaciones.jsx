import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FacturaState from './estados';
import { CabeceraModulo } from '../../extras/CabeceraModulo';
import '../../styles/controlarFacturacion/operaciones.css'

const Operaciones = () => {
  const [factura, setFactura] = useState(new FacturaState());
  const [estado, setEstado]= useState("")

  const buscarFactura = async () => {
    const idfactura = localStorage.getItem("idfactura");
    const url = `https://modulo-ventas.onrender.com/searchbillid/${idfactura}`;
    try {
      const response = await axios.get(url);
      const nuevaFactura = new FacturaState();
      nuevaFactura.actualizarDatos(idfactura, response.data.precio, response.data.estado, response.data.numero_linea);
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
    <div >
      <CabeceraModulo></CabeceraModulo>
      <div className='contenedor-factura'>
      <div className='factura-seleccionada'>
      <p>Factura</p>
      <p>ID: {factura.id}</p>
      <p>Numero facturado: {factura.numero_linea} </p>
      <p>Precio: {factura.precio}</p>
      <p>Estado: {estado}</p>
      </div>
      <div className='contenedor-botones'>
      <button className='btn-struct btn-color1' onClick={() => factura.pagar(factura.numero_linea, factura.id, factura)}>Pagar servicio</button>
      <button className='btn-struct btn-color2' onClick={() => factura.suspender(factura.numero_linea, factura.id, factura)}>Suspender servicio</button>
      <button className='btn-struct btn-color3' onClick={() => factura.cancelar(factura.numero_linea, factura.id, factura)}>Cancelar servicio</button>
      </div>
    </div>
    </div>
  );
};

export default Operaciones;
