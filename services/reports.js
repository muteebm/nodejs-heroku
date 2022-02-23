'use strict';

// const Pool = require('pg').Pool;
const db = require("../config/database");

const getReportsData = async (varId) => {
    try {
        const response = await db.query('SELECT var_id, datetime, fields, fields_json, value, unit FROM "data".main where var_id =' + varId + ' ORDER BY datetime ASC;');
        return response.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getReportsData,
};
