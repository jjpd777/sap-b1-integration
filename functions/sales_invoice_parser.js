
function sales_invoice_items_parser(i, invoice) {
    return {
        txn: invoice.NumAtCard,
        issue_date: invoice.DocDate,
        issue_time: invoice.DocTime,
        due_date: invoice.DocDueDate,
        customer_name: invoice.CardName,
        invoice_total_discount: invoice.TotalDiscount,
        item_code: i.ItemCode,
        barcode: i.BarCode,
        item_description: i.ItemDescription,
        item_quantity: i.Quantity,
        ship_date: i.ShipDate,
        item_price: i.Price,
        item_discount: i.DiscountPercent,
        warehouse: i.WarehouseCode,
        tax_code: i.TaxCode,
        item_buy_price: i.GrossBuyPrice,
        item_gross_profit: i.GrossProfit
    }
}

module.exports = function sales_invoices_parser(list_of_invoices) {
  try{ 
    let temporal = [];
    list_of_invoices.map(invoice => {
        invoice.DocumentLines.map(
            item_purchase =>
            temporal.push(
                sales_invoice_items_parser(item_purchase, invoice)
            ));
    });
    return [].concat(temporal);

    return temporal;
        
} catch (e) {
    console.log(e);
    return [];
}
}
