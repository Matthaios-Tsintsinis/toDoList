import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var d = new Date();
var dayName = days[d.getDay()];
var monthName = months[d.getMonth()];
var year = d.getFullYear();

var homeItems = [];
var workItems = [];

app.get("/", (req, res) => {

    res.render("index.ejs", {title: `${dayName}, ${monthName} ${year} `, items: homeItems, actionPath: "/addHome"});
});

app.post("/addHome", (req, res) => {

    if (req.body.newItem){
        homeItems.push(req.body.newItem);
    }

    res.redirect("/");
});


app.get("/work", (req, res) => {

    res.render("index.ejs", {title: "Work List", items: workItems, actionPath: "/addWork"});
});

app.post("/addWork", (req, res) => {

    if (req.body.newItem){
        workItems.push(req.body.newItem);
    }

    res.redirect("/work");
});


app.listen(port, () => {
    console.log("listening on port " + port);
});