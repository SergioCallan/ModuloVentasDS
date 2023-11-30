// Cambiar a medida que se avance
class EstadoBase {
    buscarDatosDia(numero_linea, id) {
        throw new Error("Método pagar no implementado.");
      }
    
    buscarDatosSemana(numero_linea, id) {
        throw new Error("Método suspender no implementado.");
      }
    
    buscarDatosMes(numero_linea, id) {
        throw new Error("Método cancelar no implementado.");
      }
}

// EstadoPendiente.js
class General extends EstadoBase {
  async buscarDatosDia(tiempo, periodo1, periodo2){
    //TODO: Darle logica a buscar datos, agregar las graficas y arreglar todo el codigo
    
  }
  async buscarDatosSemana(tiempo, periodo1, periodo2){
//TODO: Darle logica a buscar datos, agregar las graficas y arreglar todo el codigo
        try{
            const query= "SELECT SUM(monto) AS total, DATE_TRUNC('week', fecha) AS semana FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY semana ORDER BY semana"
            const resultVentas= await pool.query(query, [periodo1, periodo2])
            return resultVentas.rows
        }catch(error){
            console.error("Error al buscar datos: ", error)
        }
    }

    async buscarDatosMes(tiempo, periodo1, periodo2){
//TODO: Darle logica a buscar datos, agregar las graficas y arreglar todo el codigo
        try{
            const query= "SELECT SUM(monto) AS total, DATE_TRUNC('month', fecha) AS mes FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY mes ORDER BY mes"
            const resultVentas= await pool.query(query, [periodo1, periodo2])
            return resultVentas.rows
        }catch(error){
            console.error("Error al buscar datos: ", error)
        }
    }
}

class Equipo extends EstadoBase {
  async buscarDatosDia(tiempo, periodo1, periodo2){
    //TODO: Agregarle la parte de detalleventa
    try{
      const queryVentas = "SELECT id_venta, fecha FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY id_venta, fecha ORDER BY fecha";
      const resultVentas = await pool.query(queryVentas, [periodo1, periodo2]);

      const detallePromises = resultVentas.rows.map(async (venta) => {
          const queryDetalles = "SELECT SUM(coste_total) AS total FROM detalleventa WHERE tipo='Celular' AND id_venta= $1";
          const resultDetalles = await pool.query(queryDetalles, [venta.id_venta]);
          return resultDetalles.rows[0].total || 0;
      });

      const detallesTotales = await Promise.all(detallePromises);

      const result = resultVentas.rows.map((venta, index) => ({
          fecha: venta.fecha,
          total: detallesTotales[index]
      }));

      return result;
    }catch(error){
        console.error("Error al buscar datos: ", error)
    }
  }
  async buscarDatosSemana(tiempo, periodo1, periodo2) {
    // TODO: Darle lógica a buscar datos, agregar las gráficas y arreglar todo el código
    try {
        const queryVentas = `SELECT DATE_TRUNC('week', fecha) AS semana, SUM(coste_total) AS total FROM venta v INNER JOIN detalleventa dv ON v.id_venta = dv.id_venta WHERE fecha BETWEEN $1 AND $2 AND dv.tipo = 'Celular' GROUP BY semana ORDER BY semana`;
        const resultVentas = await pool.query(queryVentas, [periodo1, periodo2]);

        const result = resultVentas.rows.map((venta) => ({
            semana: venta.semana,
            total: venta.total || 0
        }));

        return result;
    } catch (error) {
        console.error("Error al buscar datos: ", error);
    }
}

    async buscarDatosMes(tiempo, periodo1, periodo2){
//TODO: Darle logica a buscar datos, agregar las graficas y arreglar todo el codigo
        try{
            const query= "SELECT SUM(monto) AS total, DATE_TRUNC('month', fecha) AS mes FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY mes ORDER BY mes"
            const resultVentas= await pool.query(query, [periodo1, periodo2])
            return resultVentas.rows
        }catch(error){
            console.error("Error al buscar datos: ", error)
        }
    }
}

class Plan extends EstadoBase {
  async buscarDatosDia(tiempo, periodo1, periodo2){
  //TODO: Darle logica a buscar datos, agregar las graficas y arreglar todo el codigo
  try{
      const query= "SELECT SUM(monto) AS total, fecha FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY fecha ORDER BY fecha"
      const resultVentas= await pool.query(query, [periodo1, periodo2])
      return resultVentas.rows
  }catch(error){
      console.error("Error al buscar datos: ", error)
  }
}
  async buscarDatosSemana(tiempo, periodo1, periodo2){
//TODO: Darle logica a buscar datos, agregar las graficas y arreglar todo el codigo
    try{
        const query= "SELECT SUM(monto) AS total, DATE_TRUNC('week', fecha) AS semana FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY semana ORDER BY semana"
        const resultVentas= await pool.query(query, [periodo1, periodo2])
        return resultVentas.rows
    }catch(error){
        console.error("Error al buscar datos: ", error)
    }
  }

  async buscarDatosMes(tiempo, periodo1, periodo2){
//TODO: Darle logica a buscar datos, agregar las graficas y arreglar todo el codigo
    try{
        const query= "SELECT SUM(monto) AS total, DATE_TRUNC('month', fecha) AS mes FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY mes ORDER BY mes"
        const resultVentas= await pool.query(query, [periodo1, periodo2])
        return resultVentas.rows
    }catch(error){
        console.error("Error al buscar datos: ", error)
    }
  }
}

class Factura extends EstadoBase {
  async buscarDatosDia(tiempo, periodo1, periodo2){
    //TODO: Darle logica a buscar datos, agregar las graficas y arreglar todo el codigo
    try{
        const query= "SELECT SUM(monto) AS total, fecha FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY fecha ORDER BY fecha"
        const resultVentas= await pool.query(query, [periodo1, periodo2])
        return resultVentas.rows
    }catch(error){
        console.error("Error al buscar datos: ", error)
    }
  }
  async buscarDatosSemana(tiempo, periodo1, periodo2){
//TODO: Darle logica a buscar datos, agregar las graficas y arreglar todo el codigo
        try{
            const query= "SELECT SUM(monto) AS total, DATE_TRUNC('week', fecha) AS semana FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY semana ORDER BY semana"
            const resultVentas= await pool.query(query, [periodo1, periodo2])
            return resultVentas.rows
        }catch(error){
            console.error("Error al buscar datos: ", error)
        }
    }

    async buscarDatosMes(tiempo, periodo1, periodo2){
//TODO: Darle logica a buscar datos, agregar las graficas y arreglar todo el codigo
        try{
            const query= "SELECT SUM(monto) AS total, DATE_TRUNC('month', fecha) AS mes FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY mes ORDER BY mes"
            const resultVentas= await pool.query(query, [periodo1, periodo2])
            return resultVentas.rows
        }catch(error){
            console.error("Error al buscar datos: ", error)
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
      case "Factura":
          this.estado= new Factura();
          break;
      default:
        this.estado = new EstadoBase();
        break;
    }
  }

    buscarDatosDia() {
        this.estado.buscarDatosDia(this.tiempo, this.periodo1, this.periodo2, this);
    }
    buscarDatosDia() {
        this.estado.buscarDatosDia(this.tiempo, this.periodo1, this.periodo2, this);
    }
    buscarDatosDia() {
        this.estado.buscarDatosDia(this.tiempo, this.periodo1, this.periodo2, this);
    }
}

export default FiltroState;
