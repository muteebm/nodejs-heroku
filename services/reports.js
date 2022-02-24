'use strict';

// const Pool = require('pg').Pool;
const db = require("../config/database");

const getReportsData = async (varId) => {
    try {
        const response = await db.query('SELECT * FROM "data".main where var_id =' + varId + ' ORDER BY datetime ASC;');
        return response.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getReportsData,
};
