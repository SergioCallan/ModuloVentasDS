import axios from "axios";

// Cambiar a medida que se avance
class EstadoBase {
    buscarDatosDia(periodo1, periodo2) {
        throw new Error("Método no implementado.");
      }
    
    buscarDatosSemana(periodo1, periodo2) {
        throw new Error("Método no implementado.");
      }
    
    buscarDatosMes(periodo1, periodo2) {
        throw new Error("Método no implementado.");
      }
}

// EstadoPendiente.js
class General extends EstadoBase {
  async buscarDatosDia(periodo1, periodo2){
    try{
        const url= `https://modulo-ventas.onrender.com/creategreportdaily`
        const Periodo={
            periodo1: periodo1,
            periodo2: periodo2
        }
        const response= await axios.get(url, Periodo)
        return response.data
    } catch(error){
        console.error(error)
    }
  }
  async buscarDatosSemana(periodo1, periodo2){
        try{
            const url= `https://modulo-ventas.onrender.com/creategreportweekly`
            const Periodo={
                periodo1: periodo1,
                periodo2: periodo2
            }
            const response= await axios.get(url, Periodo)
            return response.data
        } catch(error){
            console.error(error)
        }
    }

    async buscarDatosMes(periodo1, periodo2){
        try{
            const url= `https://modulo-ventas.onrender.com/creategreportmonthly`
            const Periodo={
                periodo1: periodo1,
                periodo2: periodo2
            }
            const response= await axios.get(url, Periodo)
            return response.data
        } catch(error){
            console.error(error)
        }
    }
}

class Equipo extends EstadoBase {
  async buscarDatosDia(periodo1, periodo2){
    try{
        const url= `https://modulo-ventas.onrender.com/createereportdaily`
        const Periodo={
            periodo1: periodo1,
            periodo2: periodo2
        }
        const response= await axios.get(url, Periodo)
        return response.data
    } catch(error){
        console.error(error)
    }    
  }
  async buscarDatosSemana(periodo1, periodo2) {
    try{
        const url= `https://modulo-ventas.onrender.com/createereportweekly`
        const Periodo={
            periodo1: periodo1,
            periodo2: periodo2
        }
        const response= await axios.get(url, Periodo)
        return response.data
    } catch(error){
        console.error(error)
    }
}

    async buscarDatosMes(periodo1, periodo2){
        try{
            const url= `https://modulo-ventas.onrender.com/createereportmonthly`
            const Periodo={
                periodo1: periodo1,
                periodo2: periodo2
            }
            const response= await axios.get(url, Periodo)
            return response.data
        } catch(error){
            console.error(error)
        }
    }
}

class Plan extends EstadoBase {
  async buscarDatosDia(periodo1, periodo2){
    try{
        const url= `https://modulo-ventas.onrender.com/createpreportdaily`
        const Periodo={
            periodo1: periodo1,
            periodo2: periodo2
        }
        const response= await axios.get(url, Periodo)
        return response.data
    } catch(error){
        console.error(error)
    }
}
  async buscarDatosSemana(periodo1, periodo2){
    try{
        const url= `https://modulo-ventas.onrender.com/createpreportweekly`
        const Periodo={
            periodo1: periodo1,
            periodo2: periodo2
        }
        const response= await axios.get(url, Periodo)
        return response.data
    } catch(error){
        console.error(error)
    }
  }

  async buscarDatosMes(periodo1, periodo2){
    try{
        const url= `https://modulo-ventas.onrender.com/createpreportmonthly`
        const Periodo={
            periodo1: periodo1,
            periodo2: periodo2
        }
        const response= await axios.get(url, Periodo)
        return response.data
    } catch(error){
        console.error(error)
    }
  }
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
      default:
        this.estado = new EstadoBase();
        break;
    }
  }

    buscarDatosDia() {
        this.estado.buscarDatosDia(this.periodo1, this.periodo2, this);
    }
    buscarDatosSemana() {
        this.estado.buscarDatosDia(this.periodo1, this.periodo2, this);
    }
    buscarDatosMes() {
        this.estado.buscarDatosDia(this.periodo1, this.periodo2, this);
    }
}

export default FiltroState;
