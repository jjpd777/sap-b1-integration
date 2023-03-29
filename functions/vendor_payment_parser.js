
function payment_invoices_items(document_lines) {
    var response = "";
    document_lines.map( i => { 
      response += "doc_entry="+ i.DocEntry + "sum_applied="+ i.SumApplied 
      + "sum_applied_sys="+i.AppliedSys+ "discount_applied="+i.DiscountPercent+ "&&"
    })
    return response;
};




function extract_vendor_payment(doc) {
    return {
        status_confirmed: null,
        cancel_status: doc.Cancelled,
        
        txn_doc_num: doc.DocNum,
        txn_doc_entry: doc.DocEntry,
        vendor_name: doc.CardName,
        vendor_code: doc.CardCode,
        tax_date: doc.TaxDate,
        creation_date: doc.DocDate,
        transfer_date: doc.TransferDate,

        payment_total: doc.TransferSum,
        payment_reference: doc.TransferReference,
        payment_method: doc.U_B1SYS_PmntMethod,
        payment_priority: doc.PaymentPriority,
        payment_split_txn: doc.SplitTransaction,

        bank_code : doc.BankCode,
        bank_acc : doc.BankAccount,

        payer_identifier: "PODER_JUSTO_RFC",
        comments_1: doc.JournalRemarks,
        comments_2: doc.Reference1,

        payment_invoices_detail: payment_invoices_items( doc.PaymentInvoices)
        
    };
};


module.exports =  function vendor_payments_parser(list_documents) {
    var temporal = [];
    list_documents.map( vendor_payment => {

        temporal.push( extract_vendor_payment(vendor_payment) )
    });
    console.log(temporal)

    return temporal;
};