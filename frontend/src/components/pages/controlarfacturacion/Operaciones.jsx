import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Operaciones = () => {
  const [id, setID] = useState("");
  const [precio, setPrecio] = useState(0);
  const [estado, setEstado] = useState("");

  const buscarFactura = async () => {
    const idfactura = localStorage.getItem("idfactura");
    const url = `https://modulo-ventas.onrender.com/searchbillid/${idfactura}`;
    try {
      const response = await axios.get(url);
      console.log(response)
      setID(idfactura);
      setPrecio(response.data.precio);
      setEstado(response.data.estado);
     
    } catch (error) {
      console.log(error);
    }
  }

  const ComprobarEstado= async (estado)=>{
    
  }

  const PagarFactura= async (e)=>{
    e.preventDefault();
    if(estado=="Pendiente"){
      //agregar logica
    }
    if(estado=="Pagado"){
      alert("La factura ya ha sido pagada.")
    }
    if(estado=="Suspendido"){
      alert("El servicio se encuentra suspendido, comunicarse con el módulo de clientes para reactivarlo")
    }
    if(estado=="Cancelado"){
      alert("El servicio se encuentra cancelado, no puede pagarse")
    }
  }

  const SuspenderFactura= async(e)=>{
    e.preventDefault();
    if(estado=="Pendiente"){
      //Agregar logica
    }
    if(estado=="Pagado"){
      alert("La factura ya ha sido pagada.")
    }
    if(estado=="Suspendido"){
      alert("El servicio ya se encuentra suspendido")
    }
    if(estado=="Cancelado"){
      alert("El servicio se encuentra cancelado, no puede suspenderse")
    }
  }

  const CancelarFactura= async(e)=>{
    if(estado=="Pendiente"){
      alert("Cancelar definitivamente la facturacion?")
      //Agregar logica
    }
    if(estado=="Pagado"){
      alert("La factura ya ha sido pagada.")
    }
    if(estado=="Suspendido"){
      alert("Cancelar definitivamente la facturacion?")
      //Agregar logica
    }
    if(estado=="Cancelado"){
      alert("El servicio se encuentra cancelado, no puede cancelarse")
    }
  }

  useEffect(() => {
    buscarFactura();
  }, []);

  return (
    <div>
      <p>Factura</p>
      <p>ID: {id}</p>
      <p>Precio: {precio}</p>
      <p>Estado: {estado}</p>
      <button onClick={PagarFactura}>Pagar</button>
      <button onClick={SuspenderFactura}>Suspender</button>
      <button onClick={CancelarFactura}>Cancelar</button>
    </div>
  );
}

export default Operaciones;