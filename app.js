const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/recipe', async (req, res) => {
    let users = await userModel.find();
    res.render("recipe", {users});
});

app.get('/add', (req, res) => {
    res.render("add");
});

app.post('/create', async(req, res) => {
    let {name, image, description, ingredients, prep, steps, cook} = req.body;
    let createUser = await userModel.create({
        name,
        image,
        description,
        ingredients,
        prep,
        steps,
        cook
    });
    res.redirect('/recipe');
});

app.get('/delete/:id', async (req, res) => {
    let users = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect('/recipe');
});

app.get('/edit/:userid', async (req, res) => {
    let user = await userModel.findOne({_id: req.params.userid});
    res.render("edit", {user});
});

app.post('/update/:userid', async (req, res) => {
    let {name, image, description, ingredients, prep, steps, cook} = req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.userid}, {name, image, description, ingredients, prep, steps, cook});
    res.redirect('/recipe');
});

app.post('/search', async (req, res) => {
    let searchResult = req.body.searchResult;
    const char = searchResult.replace(/[^a-zA-Z0-9]/g, "");
    const query = { name: { $regex: new RegExp(char, "i")}};
    const users = await userModel.find(query);
    res.render("search", {users, searchResult});
});

app.get('/view', async (req, res) => {
    let users = await userModel.find();
    res.render("view", {users});
});

app.get('/contact', (req, res) => {
    res.render("contact");
})

app.listen(3000);