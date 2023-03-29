
const axios = require('axios');
const write_file = require('./utils/file_writer');
const select_ERP_table = require('./utils/table_selector');

const {SAP_ENDPOINT, PROD_CREDENTIALS, WRITE_DIRECTORY} = require('../config');

const sap_auth = SAP_ENDPOINT + "Login";
const COUNTER_SKIP = 25;

function url_for_endpoint(object, n) {
    const r = SAP_ENDPOINT + object + "?$filter="+ DESIRED_DATE_RANGE+ "&$skip=" + String(n);
    return r
}

async function fetch_cookie() {
    const c = await axios.post(sap_auth, PROD_CREDENTIALS).then(r => r.headers["set-cookie"]);
    return {headers: {Accept: 'application/json', Cookie: c}}
}

function batch_request_builder(object, counter){
    var list_urls = [];
    for (let i = 0; i < COUNTER_SKIP; i++) {
        const skip = counter + (i*20);
        const url = url_for_endpoint(object, skip);
        list_urls.push( url)
    }
    return list_urls;
};


async function write_JSON_file( table_name, aggregate){
    const scrapper_file_n = WRITE_DIRECTORY+ table_name+"-"+"-" + +String(aggregate.length) + ".json"
    await write_file( scrapper_file_n, JSON.stringify(aggregate))
}


module.exports = async function query_ERP_table(table_name) {
    let counter = 0;
    let aggregate = [];
    var next_batch_flag = true;
    const cookie = await fetch_cookie();

    while (next_batch_flag) {

        const listOfURLs = batch_request_builder(table_name, counter);
        await axios.all(listOfURLs.map((request) =>
        axios.get(request, cookie)))
        .then(
            (response) => {
                response.map(r => {
                    const parsed = select_ERP_table(table_name, r.data.value);
                    aggregate.push(...parsed);
                    if(!r.data['odata.nextLink']){
                        next_batch_flag = false;
                    }
                });
            }
        );

        counter += COUNTER_SKIP * 20;

        console.log( counter, " scrapper parser --", aggregate.length, " aggregate length");
        console.log("last element scrapped ", aggregate[ aggregate.length -1]);



        if (!next_batch_flag) {
            await write_JSON_file( table_name, aggregate )
            aggregate = [];
        };

    };

    console.log("Finished scrapping this time period: ", SCRAPPING_DATE_RANGE, aggregate.length)
    return aggregate;
};

