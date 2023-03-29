const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({path: "./config.env"});

const port = process.env.PORT || 5001;
const corsOptions = {
    origin: '*',
    "Access-Control-Allow-Origin": '*',
    credentials: true, 
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(require("./routes"));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}, welcome back.`);
});