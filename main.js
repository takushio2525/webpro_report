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

// =============================================
// カラオケ選曲管理システム
// =============================================

// カラオケ曲データ
let karaoke_songs = [
    { id: 1, title: "まなざし", artist: "HACHI", genre: "J-POP", key: 0, memo: "", max_score: 91.015 },
    { id: 2, title: "残酷な天使のテーゼ", artist: "高橋洋子", genre: "アニソン", key: 0, memo: "定番", max_score: 90.469 },
    { id: 3, title: "星月夜", artist: "由薫", genre: "J-POP", key: 0, memo: "", max_score: 87.836 },
    { id: 4, title: "スターライト", artist: "amazarashi", genre: "J-POP", key: 0, memo: "", max_score: 87.525 },
    { id: 5, title: "自虐家のアリー", artist: "amazarashi", genre: "J-POP", key: 0, memo: "", max_score: 81.906 },
    { id: 6, title: "もう一度", artist: "amazarashi", genre: "J-POP", key: 0, memo: "", max_score: 88.264 },
    { id: 7, title: "痛覚", artist: "amazarashi", genre: "J-POP", key: 0, memo: "", max_score: 83.314 },
    { id: 8, title: "空に歌えば(生音)", artist: "amazarashi", genre: "J-POP", key: 0, memo: "", max_score: 89.621 },
    { id: 9, title: "Lovers Again", artist: "EXILE", genre: "J-POP", key: 0, memo: "", max_score: 87.628 },
    { id: 10, title: "怪獣の花唄", artist: "Vaundy", genre: "J-POP", key: 0, memo: "", max_score: 89.227 },
    { id: 11, title: "境界線(生音)", artist: "amazarashi", genre: "J-POP", key: 0, memo: "", max_score: 91.250 },
];

// 一覧表示 (List)
app.get("/karaoke", (req, res) => {
    res.render('karaoke_list', { data: karaoke_songs });
});

// 新規登録フォームへのリダイレクト (Create)
app.get("/karaoke/create", (req, res) => {
    res.redirect('/public/karaoke_new.html');
});

// 詳細表示 (Detail)
app.get("/karaoke/:number", (req, res) => {
    const number = req.params.number;
    const detail = karaoke_songs[number];
    res.render('karaoke_detail', { id: number, data: detail });
});

// 削除 (Delete)
app.get("/karaoke/delete/:number", (req, res) => {
    karaoke_songs.splice(req.params.number, 1);
    res.redirect('/karaoke');
});

// 新規登録 (Create - POST)
app.post("/karaoke", (req, res) => {
    const id = karaoke_songs.length + 1;
    karaoke_songs.push({
        id: id,
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        key: Number(req.body.key),
        memo: req.body.memo,
        max_score: Number(req.body.max_score)
    });
    console.log(karaoke_songs);
    res.render('karaoke_list', { data: karaoke_songs });
});

// 編集フォーム (Edit)
app.get("/karaoke/edit/:number", (req, res) => {
    const number = req.params.number;
    const detail = karaoke_songs[number];
    res.render('karaoke_edit', { id: number, data: detail });
});

// 更新 (Update)
app.post("/karaoke/update/:number", (req, res) => {
    karaoke_songs[req.params.number].title = req.body.title;
    karaoke_songs[req.params.number].artist = req.body.artist;
    karaoke_songs[req.params.number].genre = req.body.genre;
    karaoke_songs[req.params.number].key = Number(req.body.key);
    karaoke_songs[req.params.number].memo = req.body.memo;
    karaoke_songs[req.params.number].max_score = Number(req.body.max_score);
    console.log(karaoke_songs);
    res.redirect('/karaoke');
});

// =============================================
// ロボ部品リスト管理システム
// =============================================

// ロボ部品データ
let robot_parts = [
    { id: 1, part_name: "メインマイコン", part_number: "R7FA8M1AHECFB#AA0", order_number: "", quantity: 1, price: 0, sale_site: "https://www.digikey.jp/ja/products/detail/renesas-electronics-america-inc/R7FA8M1AHECFB-AA0/16656182", datasheet: "https://www.renesas.com/jp/ja/products/microcontrollers-microprocessors/ra-cortex-m-mcus/ra8m1-480-mhz-arm-cortex-m85-based-graphics-microcontroller-helium-and-trustzone", memo: "RA8M1 LQFP144ピン メモリ2MB" },
    { id: 2, part_name: "12v→5vレギュレーター", part_number: "MAXM17634AMG+T", order_number: "", quantity: 1, price: 0, sale_site: "https://www.mouser.jp/ProductDetail/Analog-Devices-Maxim-Integrated/MAXM17634AMG%2bT", datasheet: "https://www.analog.com/jp/products/maxm17634.html", memo: "スイッチングレギュレーター" },
    { id: 3, part_name: "5v→3.3vレギュレーター", part_number: "TS1117BCW33_RPG", order_number: "", quantity: 1, price: 0, sale_site: "https://www.digikey.jp/ja/products/detail/taiwan-semiconductor-corporation/TS1117BCW33-RPG/7359990", datasheet: "https://www.taiwansemi.com/products/details/TS1117B", memo: "3端子レギュレーター" },
    { id: 4, part_name: "マイクロSDスロット", part_number: "DM3AT-SF-PEJM5", order_number: "", quantity: 1, price: 0, sale_site: "https://www.mouser.jp/ProductDetail/Hirose-Connector/DM3AT-SF-PEJM5", datasheet: "https://www.hirose.com/product/p/CL0609-0033-6-00", memo: "GRビーチについてるやつ" },
    { id: 5, part_name: "エンコーダー", part_number: "18S-300-2MD-2-15-00E", order_number: "", quantity: 1, price: 0, sale_site: "https://www.monotaro.com/p/3569/4373/", datasheet: "https://www.nemicon.co.jp/products/18s_series/", memo: "300パルス ラインドライバー" },
    { id: 6, part_name: "ボリューム", part_number: "RDC506018A", order_number: "", quantity: 1, price: 0, sale_site: "https://www.digikey.jp/ja/products/detail/alps-alpine/RDC506018A/6619605", datasheet: "https://www.mouser.jp/datasheet/2/15/RDC50-1370955.pdf", memo: "M4のものマイコンカー販売と違う" },
    { id: 7, part_name: "USB-Cコネクタ", part_number: "USB4105-GF-A-120", order_number: "", quantity: 1, price: 0, sale_site: "https://www.digikey.jp/ja/products/detail/gct/USB4105-GF-A-120/13547371", datasheet: "https://www.mouser.jp/datasheet/2/837/USB4105-1601953.pdf", memo: "データシート、CADモデルあり" },
    { id: 8, part_name: "ゲートドライバ", part_number: "A3921KLPTR-T", order_number: "", quantity: 5, price: 0, sale_site: "https://www.digikey.jp/ja/products/detail/allegro-microsystems/A3921KLPTR-T/4756668", datasheet: "https://www.allegromicro.com/en/products/motor-drivers/brush-dc-motor-drivers/a3921", memo: "" },
    { id: 9, part_name: "FETアレイ", part_number: "DMT3020LSDQ-13", order_number: "", quantity: 10, price: 0, sale_site: "https://www.digikey.jp/ja/products/detail/diodes-incorporated/DMT3020LSDQ-13/5218234", datasheet: "https://www.mouser.jp/datasheet/2/115/DMT3020LSDQ-1290399.pdf", memo: "FET2こいり" },
    { id: 10, part_name: "I2C接続小型キャラクターLCD", part_number: "AQM0802A-RN-GBW", order_number: "", quantity: 1, price: 0, sale_site: "https://akizukidenshi.com/catalog/g/g106795/", datasheet: "https://akizukidenshi.com/download/ds/xiamen/AQM0802.pdf", memo: "I2C" },
    { id: 11, part_name: "モータードライブPWMピンFET", part_number: "2N7002-7-F", order_number: "", quantity: 5, price: 0, sale_site: "https://www.digikey.jp/ja/products/detail/diodes-incorporated/2N7002-7-F/717849", datasheet: "https://www.mouser.jp/datasheet/2/115/2N7002-1850915.pdf", memo: "" },
    { id: 12, part_name: "電流センサ", part_number: "CT426-HSN820MR", order_number: "", quantity: 5, price: 0, sale_site: "https://www.mouser.jp/ProductDetail/Allegro-MicroSystems/CT426-HSN820MR", datasheet: "https://www.allegromicro.com/en/products/sense/current-sensor-ics/zero-to-fifty-amp-integrated-conductor-sensor-ics/ct426", memo: "双方向 50mV/A" },
    { id: 13, part_name: "コネクタIfc 22p", part_number: "5051102296", order_number: "", quantity: 2, price: 0, sale_site: "", datasheet: "", memo: "" },
    { id: 14, part_name: "電流センサ 2", part_number: "CT427-HSN820MR", order_number: "", quantity: 1, price: 0, sale_site: "https://www.mouser.jp/ProductDetail/Allegro-MicroSystems/CT427-HSN820MR", datasheet: "https://www.allegromicro.com/en/products/sense/current-sensor-ics/zero-to-fifty-amp-integrated-conductor-sensor-ics/ct427", memo: "" },
];

// 一覧表示 (List)
app.get("/robot", (req, res) => {
    res.render('robot_list', { data: robot_parts });
});

// 新規登録フォームへのリダイレクト (Create)
app.get("/robot/create", (req, res) => {
    res.redirect('/public/robot_new.html');
});

// 詳細表示 (Detail)
app.get("/robot/:number", (req, res) => {
    const number = req.params.number;
    const detail = robot_parts[number];
    res.render('robot_detail', { id: number, data: detail });
});

// 削除 (Delete)
app.get("/robot/delete/:number", (req, res) => {
    robot_parts.splice(req.params.number, 1);
    res.redirect('/robot');
});

// 新規登録 (Create - POST)
app.post("/robot", (req, res) => {
    const id = robot_parts.length + 1;
    robot_parts.push({
        id: id,
        part_name: req.body.part_name,
        part_number: req.body.part_number,
        order_number: req.body.order_number,
        quantity: Number(req.body.quantity),
        price: Number(req.body.price),
        sale_site: req.body.sale_site,
        datasheet: req.body.datasheet,
        memo: req.body.memo
    });
    console.log(robot_parts);
    res.render('robot_list', { data: robot_parts });
});

// 編集フォーム (Edit)
app.get("/robot/edit/:number", (req, res) => {
    const number = req.params.number;
    const detail = robot_parts[number];
    res.render('robot_edit', { id: number, data: detail });
});

// 更新 (Update)
app.post("/robot/update/:number", (req, res) => {
    robot_parts[req.params.number].part_name = req.body.part_name;
    robot_parts[req.params.number].part_number = req.body.part_number;
    robot_parts[req.params.number].order_number = req.body.order_number;
    robot_parts[req.params.number].quantity = Number(req.body.quantity);
    robot_parts[req.params.number].price = Number(req.body.price);
    robot_parts[req.params.number].sale_site = req.body.sale_site;
    robot_parts[req.params.number].datasheet = req.body.datasheet;
    robot_parts[req.params.number].memo = req.body.memo;
    console.log(robot_parts);
    res.redirect('/robot');
});

app.listen(8080, () => console.log("App listening on port 8080!"));
