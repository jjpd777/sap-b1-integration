
function payment_days_converter(code) {
    const dict = {
        "-1": "8",
        "15": "2",
        "18": "20",
        "19": "21",
        "12": "45",
        "24": "26",
        "8": "consignacion",
        "14": "none",
        "13": "28",
        "16": "contraentrega",
        "17": "anticipo",
        "9": "30",
        "25": "35",
        "20": "40",
        "21": "60",
        "23": "10",
        "1": "contado",
        "22": "14",
        "10": "7",
        "11": "15",
    };
    return dict[String(code)]
};

function credit_items(document_lines) {
    var r = "&";
    document_lines.map(discount => {
        r += "item_code=" + discount.ItemCode + "&description=" + discount.ItemDescription
            + "&quantity=" + discount.Quantity + "&price=" + discount.Price + "----"
    })
    return r;
}

function extract_credit_note(cn) {
    return {
        txn: cn.NumAtCard,
        txn_num: cn.TransNum,
        supplier: cn.CardName,
        card_code: cn.CardCode,
        fiscal_id: cn.FederalTaxID,
        uuid: cn.U_UDF_UUID ? cn.U_UDF_UUID : "- / -",
        payment_terms: payment_days_converter(cn.PaymentGroupCode),
        doc_date: cn.DocDate,
        doc_due_date: cn.DocDueDate,
        credit_note_total: cn.DocTotal,
        total_sys: cn.DocTotalSys,
        warehouse: cn.WarehouseCode,
        tax_code: cn.TaxCode,
        comments: cn.Comments,
        memo: cn.JournalMemo,
        control_acc: cn.ControlAccount,
        total_disc: credit_items(cn.DocumentLines)
    }
}

module.exports = function purchase_credit_notes(list_credit_notes) {

    try {
        let temporal = [];
        list_credit_notes.map(credit_note => {
            const cn = extract_credit_note(credit_note);
            temporal.push(cn)
        });

        return temporal;
        
    } catch (e) {
        console.log(e);
        return [];
    }
};
