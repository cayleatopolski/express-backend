const express = require("express");
const app = express();
const port = 5000;
const cartRoutes = require("./routes/cartRoutes");
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/", cartRoutes);

app.listen(port, () => console.log(`server is running on port: ${port}`));

//to resolve cannot get and test server
// app.get("/", (req, res) => res.send("hello"));
