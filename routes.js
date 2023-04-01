const express = require("express");
const recordRoutes = express.Router();

const query_ERP_table = require('./functions/query_erp');

const config = require("./config");
const {documents} = config;


// GET REQUST a API hosteado localmente http://localhost:5000/erp_query/purchase-invoices

recordRoutes.route("/erp_query/:object_doc").get(async function (req, res) {
    const path = req.params.object_doc;
    const document_object = documents[path];
    try {

        await query_ERP_table(document_object, path);
        res.send({invoices: "Successfully retrieved information from the ERP"});

    } catch (e) {
        console.log(e);
        res.send({e})
    }
});


module.exports = recordRoutes;