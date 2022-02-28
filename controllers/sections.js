const reportService = require('../services/sections')
const httpStatusCode = require('http-status-codes')

const getSectionsAndVariables = async (req, res) => {
    try {
        const response = await reportService.getSectionsAndVariables();
        if (response && response.length <= 0) {
            return res.status(httpStatusCode.OK).send({
                status: true,
                type: 'success',
                message: 'No data exist',
                data: [],
            });
        }
        // Parsing the queried response in a better format for frontend to handle easily.
        let parsedResponse = [];
        let prevSectionId = null;
        response.forEach((value) => {
            if(prevSectionId) {
                if(value.section_id == prevSectionId) {
                    parsedResponse[parsedResponse.length-1].children.push(
                        {title: value.variable_name, icon: value.variable_icon, var_id: value.var_id})
                }
                else {
                    parsedResponse.push({title: value.section_name, icon: value.section_icon, children: [{title: value.variable_name, icon: value.variable_icon, var_id: value.var_id}]})
                }
            }
            else {
                parsedResponse.push({title: value.section_name, icon: value.section_icon, children: [{title: value.variable_name, icon: value.variable_icon, var_id: value.var_id}]})
            }
            prevSectionId = value.section_id;
            // if(!parsedResponse[value.section_id]) {
            //     parsedResponse[value.section_id] = {name: value.section_name, icon: value.section_icon,
            //          variables: [{id: value.variable_id, name: value.variable_name, icon: value.variable_icon}]}
            // } else {
            //     parsedResponse[value.section_id].variables.push({id: value.variable_id, name: value.variable_name, icon: value.variable_icon});
            // }
        })
        return res.status(httpStatusCode.OK).send({
            status: true,
            type: 'success',
            message: 'Sections data fetched successfully',
            data: parsedResponse
        });
    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
            status: false,
            type: 'error',
            message: 'Error while fetching data',
            data: error,
        });
    }
}


module.exports = {
    getSectionsAndVariables
}