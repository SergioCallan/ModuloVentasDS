// Cambiar a medida que se avance
class EstadoBase {
    
}

// EstadoPendiente.js
class General extends EstadoBase {
  async buscarDatos(tiempo, periodo1, periodo2){
      //TODO: Darle logica a buscar datos, agregar las graficas y arreglar todo el codigo
      try{
        const query= "SELECT SUM(monto) AS total, fecha FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY fecha ORDER BY fecha"
        const resultVentas= await pool.query(query, [periodo1, periodo2])
        return resultVentas.rows
      }catch(error){
        console.error("Error al buscar datos: ", error)
      }
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
