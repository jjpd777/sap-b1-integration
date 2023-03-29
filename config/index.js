

const documents = {
    "invoices": "Invoices",
    "purchase-invoices": "PurchaseInvoices",
    "purchase-credit-notes-": "PurchaseInvoices",
    "inventory": "Items",
    "purchase-orders": "PurchaseOrders",
    "vendor-payments": "VendorPayments",
    "suppliers-detail": "BusinessPartners",
};

const SAP_ENDPOINT = true ? "https://10.10.10.4:50000/b1s/v1/" : "https://20.225.223.249:55000/b1s/v1/";
const PROD_CREDENTIALS = {
    "CompanyDB": process.env.ERP_COMPANY_DB,
    "UserName": process.env.ERP_USERNAME, 
    "Password": process.env.ERP_PASSWORD
};

const DESIRED_DATE_RANGE = "DocDate ge '2021-10-31' and DocDate le '2021-12-01'";
const WRITE_DIRECTORY = "./output/";



module.exports = {
    documents,
    SAP_ENDPOINT,
    PROD_CREDENTIALS,
    WRITE_DIRECTORY,
    DESIRED_DATE_RANGE
}