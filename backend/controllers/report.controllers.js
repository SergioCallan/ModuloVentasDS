const pool = require('../db');

class ReportStrategy {
  async createReport(periodo1, periodo2, query) {
    try {
      const resultVentas = await pool.query(query, [periodo1, periodo2]);
      // Lógica de procesamiento común
      return resultVentas.rows;
    } catch (error) {
      console.error("Error al buscar datos: ", error);
      throw error;
    }
  }
}

class DailyReportStrategy extends ReportStrategy {
  constructor() {
    super();
    this.query = "SELECT SUM(monto) AS total, fecha as start_date, fecha as end_date FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY fecha ORDER BY fecha";
  }
}

class WeeklyReportStrategy extends ReportStrategy {
  constructor() {
    super();
    this.query = "SELECT DATE_TRUNC('week', fecha) AS semana, MIN(fecha) AS start_date, MAX(fecha) AS end_date, SUM(monto) AS total FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY semana ORDER BY semana";
  }
}

class MonthlyReportStrategy extends ReportStrategy {
  constructor() {
    super();
    this.query = "SELECT DATE_TRUNC('month', fecha) AS mes, MIN(fecha) AS start_date, MAX(fecha) AS end_date, SUM(monto) AS total FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY mes ORDER BY mes";
  }
}

class EquipmentReportStrategy extends ReportStrategy {
  constructor() {
    super();
    this.query = "SELECT DATE_TRUNC('week', fecha) AS semana, MIN(fecha) AS start_date, MAX(fecha) AS end_date, SUM(monto) AS total FROM venta WHERE fecha BETWEEN $1 AND $2 AND tipo = 'Equipo' GROUP BY semana ORDER BY semana";
  }
}

class PlanReportStrategy extends ReportStrategy {
  constructor() {
    super();
    this.query = "SELECT DATE_TRUNC('week', fecha) AS semana, MIN(fecha) AS start_date, MAX(fecha) AS end_date, SUM(monto) AS total FROM venta WHERE fecha BETWEEN $1 AND $2 AND tipo = 'Plan' GROUP BY semana ORDER BY semana";
  }
}

const createReport = async (req, res, strategy) => {
  const { periodo1, periodo2 } = req.query;
  const reportStrategy = new strategy();

  const result = await reportStrategy.createReport(periodo1, periodo2, reportStrategy.query);

  res.json(result);
};

const createEReportDaily = async (req, res, strategy) => {
  const { periodo1, periodo2 } = req.query;
  const reportStrategy = new strategy();

  const result = await reportStrategy.createReport(periodo1, periodo2, reportStrategy.query);

  res.json(result);
};

const createEReportWeekly = async (req, res, strategy) => {
  const { periodo1, periodo2 } = req.query;
  const reportStrategy = new strategy();

  const result = await reportStrategy.createReport(periodo1, periodo2, reportStrategy.query);

  res.json(result);
};

const createEReportMonthly = async (req, res, strategy) => {
  const { periodo1, periodo2 } = req.query;
  const reportStrategy = new strategy();

  const result = await reportStrategy.createReport(periodo1, periodo2, reportStrategy.query);

  res.json(result);
};

const createPReportDaily = async (req, res, strategy) => {
  const { periodo1, periodo2 } = req.query;
  const reportStrategy = new strategy();

  const result = await reportStrategy.createReport(periodo1, periodo2, reportStrategy.query);

  res.json(result);
};

const createPReportWeekly = async (req, res, strategy) => {
  const { periodo1, periodo2 } = req.query;
  const reportStrategy = new strategy();

  const result = await reportStrategy.createReport(periodo1, periodo2, reportStrategy.query);

  res.json(result);
};

const createPReportMonthly = async (req, res, strategy) => {
  const { periodo1, periodo2 } = req.query;
  const reportStrategy = new strategy();

  const result = await reportStrategy.createReport(periodo1, periodo2, reportStrategy.query);

  res.json(result);
};

module.exports = {
  createGReportDaily: (req, res) => createReport(req, res, DailyReportStrategy),
  createGReportWeekly: (req, res) => createReport(req, res, WeeklyReportStrategy),
  createGReportMonthly: (req, res) => createReport(req, res, MonthlyReportStrategy),
  createEReportDaily: (req, res) => createEReportDaily(req, res, EquipmentReportStrategy),
  createEReportWeekly: (req, res) => createEReportWeekly(req, res, EquipmentReportStrategy),
  createEReportMonthly: (req, res) => createEReportMonthly(req, res, EquipmentReportStrategy),
  createPReportDaily: (req, res) => createPReportDaily(req, res, PlanReportStrategy),
  createPReportWeekly: (req, res) => createPReportWeekly(req, res, PlanReportStrategy),
  createPReportMonthly: (req, res) => createPReportMonthly(req, res, PlanReportStrategy),
  // ... otras funciones de informe
};
