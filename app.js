const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const errorController = require("./controllers/errors");
const PORT = process.env.PORT || 8080;



const connectionString = process.env.MONGODB_URI


app.use(cookieParser())
app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(userRoutes);

app.use("/500",errorController.get500Page)
app.use(errorController.get404Page);




mongoose.connect(connectionString)
    .then(() => {
        console.log("Connected! Mongodb")
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err)
    })

