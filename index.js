const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const { v4: getId } = require('uuid');

const app = express();
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log("start listening at port 3000");
})
let tweets = [
    { id: getId(), content: "I am Learning BackEnd Development", user: "@vishal1234" },
    { id: getId(), content: "This Week's Episode of Shogun was Awesome", user: "@shogun1234" },
    { id: getId(), content: "I am Bored, what should i do?", user: "@boringBoy" },
    { id: getId(), content: "Eating 1.5g of Protien/body Weight is Enough", user: "@gymgoer" },
    { id: getId(), content: "Listen to  'Jaha Tum ho', my org song on Youtube", user: "@WeShall8974" },
    { id: getId(), content: "I am going to be a great programmer", user: "@loneprogrammer" },
];

app.get("/:id/edit", (req, res) => {
    const { id } = req.params;
    const t = tweets.find(t => t.id === id);
    if (t) {
        res.render("edit.ejs", { t });
    } else {
        res.send("unable to edit the tweet :(")
    }
})

app.get("/", (req, res) => {
    res.render("home", { tweets });
})
app.get("/:id", (req, res) => {
    const { id } = req.params;
    const t = tweets.find(t => t.id === id);
    if (t) {
        res.render("show.ejs", { t });
    } else {
        res.send("couldn't find a tweet with this id")
    }
})



app.post("/", (req, res) => {
    const { user, tweet } = req.body;
    if (!user || !tweet) {
        res.send("Either User name or Tweet is empty, Try again...:(");
    } else {
        tweets.push({ user: "@" + user, content: tweet, id: getId() })
        res.redirect("/");
    }
})

app.delete("/:id", (req, res) => {
    const { id } = req.params;
    tweets = tweets.filter(t => t.id !== id)
    res.redirect("/");
})

app.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { tweet } = req.body;
    const t = tweets.find(t => t.id === id);
    if (!t) {
        res.send("couldn't find the tweet :(");
    } else {
        t.content = tweet;
        res.redirect("/");
    }
})



