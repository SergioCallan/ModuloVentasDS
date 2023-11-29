import axios from "axios";
// Cambiar a medida que se avance
class EstadoBase {
    
  }
  
  // EstadoPendiente.js
  class General extends EstadoBase {
    async buscarDatos(tiempo, periodo1, periodo2){
        //TODO: Darle logica a buscar datos, agregar las graficas y arreglar todo el codigo
    }
  }

  class Equipo extends EstadoBase {
    
  }

  class Plan extends EstadoBase {
    
  }
  
  class Factura extends EstadoBase {
    
  }
  
  // Otros Estados se implementarían de manera similar
  
  // FacturaState.js
  class FiltroState {
    constructor() {
      this.tipo = new EstadoBase();
      this.tiempo = "";
      this.periodo1 = "";
      this.periodo2=""
    }
  
    actualizarDatos(tipo, tiempo, periodo1, periodo2) {
      this.tiempo = tiempo;
      this.periodo1 = periodo1;
      this.periodo2= periodo2;
  
      switch (tipo) {
        case "General":
          this.tiempo = new General();
          break;
        case "Equipo":
            this.tiempo= new Equipo();
            break;
        case "Plan":
            this.tiempo= new Plan();
            break;
        case "Factura":
            this.estado= new Factura();
            break;
        default:
          this.estado = new EstadoBase();
          break;
      }
    }
  
    buscarDatos() {
        this.estado.buscarDatos(this.tiempo, this.periodo1, this.periodo2, this);
    }
  }
  
  export default FiltroState;
  