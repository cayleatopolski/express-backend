const express = require("express");
const app = express();
const port = 5000;
const cartRoutes = require("./routes/cartRoutes");
const cors = require("cors");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());
app.use("/", cartRoutes);

app.listen(port, () => console.log(`server is running on port: ${port}`));
