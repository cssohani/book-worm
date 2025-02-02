const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send('<h1>Hello World</h1>');
})

app.listen(8080, () => {
    console.log("Server running on port: 8080")
})