/* eslint-disable camelcase */
const payment_days_converter = require('../config/payment_days');

function purchase_order_items_parser(lines) {
  return lines.DocumentLines.map((i) => ({
    item_description: i.ItemDescription,
    item_quantity: i.Quantity,
    item_price: i.Price,
    warehouse: i.WarehouseCode,
    item_unit: i.MeasureUnit,
    ship_date: i.ShipDate,
    item_code: i.ItemCode,
    barcode: i.BarCode,
    item_discount: i.DiscountPercent,
    tax_code: i.TaxCode,
  }));
}

module.exports = function purchase_orders_parser(list_of_purchase_orders) {
  return list_of_purchase_orders.map((x) => ({
    status_confirmed: x.Confirmed,
    cancel_status: x.CancelStatus,

    txn: x.U_UDF_UUID,
    card_code: x.CardCode,
    card_name: x.CardName,
    fiscal_id: x.FederalTaxID,
    identifier: x.NumAtCard,

    doc_date: x.DocDate,
    tax_date: x.TaxDate,
    creation_date: x.CreationDate,
    updated_date: x.UpdateDate,
    due_date: x.DocDueDate,

    total_value: x.DocTotal,
    payment_terms: payment_days_converter(x.PaymentGroupCode),

    comments_1: x.Comments,
    comments_2: x.JournalMemo,

    document_lines: purchase_order_items_parser(x),
  }));
};
