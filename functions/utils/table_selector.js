const sales_invoice_parser = require('../sales_invoice_parser');
const credit_note_parser = require('../credit_note_parser');
const purchase_invoice_parser = require('../purchase_invoice_parser');
const purchase_orders_parser = require('../purchase_order_parser');
const vendor_payments_parser = require('../vendor_payment_parser');

module.exports = function select_ERP_table ( table_name, raw_data ){
    switch( table_name ){

        case "Invoices":
            return sales_invoice_parser(raw_data);

        case "PurchaseCreditNotes":
            return credit_note_parser( raw_data );

        case "PurchaseInvoices":
            return purchase_invoice_parser( raw_data );
        
        case "VendorPayments":
            return vendor_payments_parser( raw_data );
        
        case "PurchaseOrders":
            return purchase_orders_parser( raw_data);

        default: console.log("wrong data table is being accessed.")
    }
};
