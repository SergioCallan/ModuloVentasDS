import axios from "axios";
import { useNavigate } from "react-router-dom";
// EstadoBase.js
class EstadoBase {
    pagar(numero_linea, id) {
      throw new Error("Método pagar no implementado.");
    }
  
    suspender(numero_linea, id) {
      throw new Error("Método suspender no implementado.");
    }
  
    cancelar(numero_linea, id) {
      throw new Error("Método cancelar no implementado.");
    }
  }
  
  // EstadoPendiente.js
  class EstadoPendiente extends EstadoBase {
    
    async pagar(numero_linea, id, facturaState) {
      alert("Realizando pago.");
      try{
        const url0= `https://modulo-ventas.onrender.com/pagolinea/${numero_linea}`
        const response0= await axios.put(url0)
        const url1= `https://modulo-ventas.onrender.com/updatebill/${numero_linea}`
        const response1= await axios.post(url1)
        const url2= `https://modulo-ventas.onrender.com/paybill/${id}`
        const response2= await axios.put(url2)
        alert("Pago realizado")
        const navigate= useNavigate()
        navigate('/observarfacturas')
      } catch(error){
        console.log("Error al realizar el pago: ", error)
      }
      facturaState.estado= new EstadoPagado();
    }
  
    async suspender(numero_linea, id, facturaState) {
      alert("Suspendiendo temporalmente el servicio");
      const url0= `https://modulo-ventas.onrender.com/atrasolinea/${numero_linea}`
      const response0= await axios.put(url0)
      const url1= `https://modulo-ventas.onrender.com/suspendbill/${id}`
      const response1= await axios.put(url1)
      alert("Servicio suspendido")
      const navigate= useNavigate()
      navigate('/observarfacturas')
      facturaState.estado= new EstadoSuspendido();
    }
  
    async cancelar(numero_linea, id, facturaState) {
      alert("Cancelando el servicio");
      const url0= `https://modulo-ventas.onrender.com/cancelarlinea/${numero_linea}`
      const response0= await axios.put(url0)
      const url1= `https://modulo-ventas.onrender.com/paybill/${id}`
      const response1= await axios.put(url1)
      alert("Servicio cancelado y última factura pagada")
      const navigate= useNavigate()
      navigate('/observarfacturas')
      facturaState.estado= new EstadoCancelado();
    }
  }

  class EstadoPagado extends EstadoBase {
    pagar(numero_linea, id, facturaState) {
      alert("Factura ya pagada.");
    }
  
    suspender(numero_linea, id, facturaState) {
      alert("Factura ya pagada, no se puede suspender");
    }
  
    cancelar(numero_linea, id, facturaState) {
      alert("Factura ya pagada, no puede cancelarse");
    }
  }

  class EstadoAtrasado extends EstadoBase {
    async pagar(numero_linea, id, facturaState) {
      alert("Realizando pago.");
      try{
        const url0= `https://modulo-ventas.onrender.com/pagolinea/${numero_linea}`
        const response0= await axios.put(url0)
        const url1= `https://modulo-ventas.onrender.com/updatebill/${numero_linea}`
        const response1= await axios.post(url1)
        const url2= `https://modulo-ventas.onrender.com/paybill/${id}`
        const response2= await axios.put(url2)
        const navigate= useNavigate()
        navigate('/observarfacturas')
        alert("Pago realizado")
      } catch(error){
        console.log("Error al realizar el pago: ", error)
      }
      facturaState.estado= new EstadoPagado();
    }
  
    suspender(numero_linea, id, facturaState) {
      alert("Factura ya registrada como atrasada y línea suspendida");
    }
  
    async cancelar(numero_linea, id, facturaState) {
      alert("Cancelando el servicio");
      const url0= `https://modulo-ventas.onrender.com/cancelarlinea/${numero_linea}`
      const response0= await axios.put(url0)
      alert("Servicio cancelado.")
      const navigate= useNavigate()
      navigate('/observarfacturas')
      facturaState.estado= new EstadoCancelado();
    }
  }
  
  // Otros Estados se implementarían de manera similar
  
  // FacturaState.js
  class FacturaState {
    constructor() {
      this.id = "";
      this.precio = 0;
      this.estado = new EstadoBase();
      this.numero_linea=""
    }
  
    actualizarDatos(id, precio, estado, numero_linea) {
      this.id = id;
      this.precio = precio;
      this.numero_linea= numero_linea;
  
      // Cambiar dinámicamente al estado correspondiente
      switch (estado) {
        case "Pendiente":
          this.estado = new EstadoPendiente();
          break;
        case "Pagado":
            this.estado= new EstadoPagado();
            break;
        case "Atrasado":
            this.estado= new EstadoAtrasado();
            break;
        default:
          this.estado = new EstadoBase();
          break;
      }
    }
  
    pagar() {
        this.estado.pagar(this.numero_linea, this.id, this);
      }
    
      suspender() {
        this.estado.suspender(this.numero_linea, this.id, this);
      }
    
      cancelar() {
        this.estado.cancelar(this.numero_linea, this.id, this);
      }
  }
  
  export default FacturaState;
  