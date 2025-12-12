const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

// 食材在庫データ
let food_stock = [
    { id: 1, name: "牛乳", stock: 2, price: 200 },
    { id: 2, name: "卵", stock: 10, price: 250 },
    { id: 3, name: "パン", stock: 1, price: 150 },
    { id: 4, name: "バター", stock: 1, price: 400 },
    { id: 5, name: "チーズ", stock: 3, price: 300 },
];

// 一覧表示 (List)
app.get("/food", (req, res) => {
    res.render('food_list', { data: food_stock });
});

// 新規登録フォームへのリダイレクト (Create)
app.get("/food/create", (req, res) => {
    res.redirect('/public/food_new.html');
});

// 詳細表示 (Detail)
app.get("/food/:number", (req, res) => {
    const number = req.params.number;
    const detail = food_stock[number];
    res.render('food_detail', { id: number, data: detail });
});

// 削除 (Delete)
app.get("/food/delete/:number", (req, res) => {
    food_stock.splice(req.params.number, 1);
    res.redirect('/food');
});

// 新規登録 (Create - POST)
app.post("/food", (req, res) => {
    const id = food_stock.length + 1;
    const name = req.body.name;
    const stock = Number(req.body.stock);
    const price = Number(req.body.price);
    food_stock.push({ id: id, name: name, stock: stock, price: price });
    console.log(food_stock);
    res.render('food_list', { data: food_stock });
});

// 編集フォーム (Edit)
app.get("/food/edit/:number", (req, res) => {
    const number = req.params.number;
    const detail = food_stock[number];
    res.render('food_edit', { id: number, data: detail });
});

// 更新 (Update)
app.post("/food/update/:number", (req, res) => {
    food_stock[req.params.number].name = req.body.name;
    food_stock[req.params.number].stock = Number(req.body.stock);
    food_stock[req.params.number].price = Number(req.body.price);
    console.log(food_stock);
    res.redirect('/food');
});

app.listen(8080, () => console.log("Food Stock App listening on port 8080!"));
