// EstadoBase.js
class EstadoBase {
    pagar() {
      throw new Error("Método pagar no implementado.");
    }
  
    suspender() {
      throw new Error("Método suspender no implementado.");
    }
  
    cancelar() {
      throw new Error("Método cancelar no implementado.");
    }
  }
  
  // EstadoPendiente.js
  class EstadoPendiente extends EstadoBase {
    pagar() {
      alert("Realizando pago.");
      // Lógica específica para el estado Pendiente
    }
  
    suspender() {
      alert("Suspender temporalmente el servicio?");
      // Lógica específica para el estado Pendiente
    }
  
    cancelar() {
      alert("Cancelar definitivamente la facturación?");
      // Lógica específica para el estado Pendiente
    }
  }

  class EstadoSuspendido extends EstadoBase {
    pagar() {
      alert("Reactivar facturación?");
      // Lógica específica para el estado Pendiente
    }
  
    suspender() {
      alert("El servicio ya está suspendido");
      // Lógica específica para el estado Pendiente
    }
  
    cancelar() {
      alert("Cancelar definitivamente la facturación?");
      // Lógica específica para el estado Pendiente
    }
  }

  class EstadoPagado extends EstadoBase {
    pagar() {
      alert("Factura ya pagada.");
      // Lógica específica para el estado Pendiente
    }
  
    suspender() {
      alert("Factura ya pagada");
      // Lógica específica para el estado Pendiente
    }
  
    cancelar() {
      alert("Factura ya pagada");
      // Lógica específica para el estado Pendiente
    }
  }

  class EstadoCancelado extends EstadoBase {
    pagar() {
      alert("Factura cancelada");
      // Lógica específica para el estado Pendiente
    }
  
    suspender() {
      alert("Factura cancelada");
      // Lógica específica para el estado Pendiente
    }
  
    cancelar() {
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
    }
  
    actualizarDatos(id, precio, estado) {
      this.id = id;
      this.precio = precio;
  
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
      this.estado.pagar();
    }
  
    suspender() {
      this.estado.suspender();
    }
  
    cancelar() {
      this.estado.cancelar();
    }
  }
  
  export default FacturaState;
  