const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
    origin: allowedOrigins[0],
    credentials: true,
    optionsSuccessStatus: 200,
};

module.exports = corsOptions;
