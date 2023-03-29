const payment_days_converter = require('../config/payment_days');


function parse_purchase_items(document_lines) {
  return document_lines.map(i => {
    return {

      item_description: i.ItemDescription,
      item_quantity: i.Quantity,
      item_price: i.Price,
      warehouse: i.WarehouseCode,
      item_unit: i.MeasureUnit,
      ship_date: i.ShipDate,
      item_code: i.ItemCode,
      barcode: i.BarCode,
      item_discount: i.DiscountPercent,
      tax_code: i.TaxCode

    }
  })
};

function parse_discounts_sum_total(document_lines) {
  var response = 0;
  document_lines.map(i => {
    if (i.ItemCode === "DESC_COMP") {
      response += i.Price
    }
  })
  return response;
}



function extract_purchase_invoices(invoice) {
  return {
    status_confirmed: invoice.Confirmed,
    cancel_status: invoice.CancelStatus,

    txn: invoice.U_UDF_UUID,
    card_code: invoice.CardCode,
    card_name: invoice.CardName,
    fiscal_id: invoice.FederalTaxID,
    identifier: invoice.NumAtCard,

    doc_date: invoice.DocDate,
    tax_date: invoice.TaxDate,
    creation_date: invoice.CreationDate,
    updated_date: invoice.UpdateDate,
    due_date: invoice.DocDueDate,

    total_value: invoice.DocTotal,
    payment_terms: payment_days_converter(invoice.PaymentGroupCode),

    comments_1: invoice.Comments,
    comments_2: invoice.JournalMemo,


    document_lines: parse_purchase_items(invoice.DocumentLines),

    paid_to_date_total: invoice.PaidToDate,
    paid_to_date_sys: invoice.PaidToDateSys,
    revenue_discount_total: parse_discounts_sum_total( invoice.DocumentLines),
    payer_identifier: "PODER_JUSTO_RFC",
    invoice_type: invoice.VatGroup,
    vat_sum: invoice.VatSum,
    vat_sum_sys : invoice.VatSumSys,


  };
};


module.exports = function purchase_invoices_parser(list_documents) {
  var temporal = [];
  list_documents.map(purchase_invoice => {

    temporal.push(extract_purchase_invoices(purchase_invoice))
  });
  console.log(temporal)

  return temporal;
};