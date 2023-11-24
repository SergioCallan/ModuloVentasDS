import axios from "axios";
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
        const url1= `https://modulo-ventas.onrender.com/paybill/${id}`
        const response1= await axios.put(url1)
        const url2= `https://modulo-ventas.onrender.com/updatebill/${numero_linea}`
        const response2= await axios.post(url2)
        alert("Pago realizado")
      } catch(error){
        console.log("Error al realizar el pago: ", error)
      }
      // Lógica específica para el estado Pendiente
      facturaState.estado= new EstadoPagado();
    }
  
    suspender(numero_linea, id, facturaState) {
      alert("Suspender temporalmente el servicio?");
      // Lógica específica para el estado Pendiente
      facturaState.estado= new EstadoSuspendido();
    }
  
    cancelar(numero_linea, id, facturaState) {
      alert("Cancelar definitivamente la facturación?");
      // Lógica específica para el estado Pendiente
      facturaState.estado= new EstadoCancelado();
    }


  }

  class EstadoSuspendido extends EstadoBase {
    pagar(numero_linea, id, facturaState) {
      alert("Reactivar facturación?");
      // Lógica específica para el estado Pendiente
    }
  
    suspender(numero_linea, id, facturaState) {
      alert("El servicio ya está suspendido");
      // Lógica específica para el estado Pendiente
    }
  
    cancelar(numero_linea, id, facturaState) {
      alert("Cancelar definitivamente la facturación?");
      // Lógica específica para el estado Pendiente
    }
  }

  class EstadoPagado extends EstadoBase {
    pagar(numero_linea, id, facturaState) {
      alert("Factura ya pagada.");
      // Lógica específica para el estado Pendiente
      facturaState.estado= new EstadoPendiente();
    }
  
    suspender(numero_linea, id, facturaState) {
      alert("Factura ya pagada");
      // Lógica específica para el estado Pendiente
    }
  
    cancelar(numero_linea, id, facturaState) {
      alert("Factura ya pagada");
      // Lógica específica para el estado Pendiente
    }
  }

  class EstadoCancelado extends EstadoBase {
    pagar(numero_linea, id, facturaState) {
      alert("Factura cancelada");
      // Lógica específica para el estado Pendiente
    }
  
    suspender(numero_linea, id, facturaState) {
      alert("Factura cancelada");
      // Lógica específica para el estado Pendiente
    }
  
    cancelar(numero_linea, id, facturaState) {
      alert("Factura ya cancelada");
      // Lógica específica para el estado Pendiente
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
        case "Suspendido":
            this.estado= new EstadoSuspendido();
            break;
        case "Cancelado":
            this.estado= new EstadoCancelado();
        // Agregar otros casos para diferentes estados
        default:
          this.estado = new EstadoBase();
          break;
      }
    }
  
    pagar() {
        this.estado.pagar(this.numero_linea, this);
      }
    
      suspender() {
        this.estado.suspender(this.numero_linea);
      }
    
      cancelar() {
        this.estado.cancelar(this.numero_linea);
      }
  }
  
  export default FacturaState;
  