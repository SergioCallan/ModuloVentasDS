// backend/actions/phoneActions.js
const pool = require('../db');

class GetAllPhonesCommand {
    async execute() {
        const result = await pool.query('SELECT * FROM celular');
        return result.rows;
    }
}

class GetPhoneByIdCommand {
    constructor(id) {
        this.id = id;
    }

    async execute() {
        const result = await pool.query('SELECT * FROM celular WHERE id_celular = $1', [this.id]);
        return result.rows[0];
    }
}

class CreatePhoneCommand {
    constructor(phoneData) {
        this.phoneData = phoneData;
    }

    async execute() {
        const { id, marca, modelo, precio, color, almacenamiento } = this.phoneData;
        const result = await pool.query(
            'INSERT INTO celular (id_celular, marca, modelo, precio, color, almacenamiento) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [id, marca, modelo, precio, color, almacenamiento]
        );
        return result.rows[0];
    }
}

class DeletePhoneByIdCommand {
    constructor(id) {
        this.id = id;
    }

    async execute() {
        await pool.query('DELETE FROM celular WHERE id_celular = $1', [this.id]);
    }
}

class UpdatePhoneByIdCommand {
    constructor(id, phoneData) {
        this.id = id;
        this.phoneData = phoneData;
    }

    async execute() {
        const { marca, modelo, precio, color, almacenamiento } = this.phoneData;
        const result = await pool.query(
            'UPDATE celular SET marca = $1, modelo = $2, precio = $3, color = $4, almacenamiento = $5 WHERE id_celular = $6 RETURNING *',
            [marca, modelo, precio, color, almacenamiento, this.id]
        );
        return result.rows[0];
    }
}

module.exports = {
    GetAllPhonesCommand,
    GetPhoneByIdCommand,
    CreatePhoneCommand,
    DeletePhoneByIdCommand,
    UpdatePhoneByIdCommand,
};
