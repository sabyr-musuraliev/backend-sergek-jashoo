const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const allowedOrigins = require("./config/allowedOrigins");
const bodyParser = require("body-parser");

const auth = require("./routes/auth.routes");
const patients = require("./routes/patient.routes");

const app = express();

app.use(express.json());
app.use(cors(allowedOrigins));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use("/auth", auth);
app.use("/patients", patients);

const PORT = config.get("port") || 5000;
const MONGOURI = config.get("mongoUri");

async function start() {
    try {
        await mongoose.connect(MONGOURI, {});
        app.listen(PORT, () =>
            console.log(`server is running on port ${PORT}`)
        );
    } catch (error) {
        console.log("Server error", error.message);
        process.exit(1);
    }
}

start();
