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
    { id: 1, part_name: "メインマイコン", part_number: "R7FA8M1AHECFB#AA0", order_number: "", quantity: 1, price: 2995, sale_site: "https://www.mouser.jp/ProductDetail/Renesas-Electronics/R7FA8M1AHECFBAA0?qs=HoCaDK9Nz5dQfm4MgZOyCw%3D%3D&srsltid=AfmBOor2o69glm6WCHmCJ5ccxX4DskL57oighIOkBawJjflMpKCn0AQM", datasheet: "https://www.renesas.com/ja/document/dst/ra8m1-group-datasheet?r=25447396", memo: "RA8M1 LQFP144ピン メモリ2MB" },
    { id: 2, part_name: "12v→5vレギュレーター", part_number: "MAXM17634AMG+T", order_number: "", quantity: 1, price: 1587, sale_site: "https://www.digikey.jp/ja/products/detail/analog-devices-inc-maxim-integrated/MAXM17634AMG-T/12460954", datasheet: "https://www.analog.com/media/en/technical-documentation/data-sheets/MAXM17633-MAXM17635.pdf", memo: "スイッチングレギュレーター" },
    { id: 3, part_name: "5v→3.3vレギュレーター", part_number: "TS1117BCW33_RPG", order_number: "", quantity: 1, price: 59, sale_site: "https://www.digikey.jp/en/products/detail/taiwan-semiconductor-corporation/TS1117BCW33-RPG/7370078", datasheet: "https://services.taiwansemi.com/storage/resources/datasheet/TS1117B_I2405.pdf", memo: "3端子レギュレーター" },
    { id: 4, part_name: "マイクロSDスロット", part_number: "DM3AT-SF-PEJM5", order_number: "", quantity: 1, price: 427, sale_site: "https://www.digikey.jp/ja/products/detail/hirose-electric-co-ltd/DM3AT-SF-PEJM5/2533565?gclsrc=aw.ds&gad_source=1&gad_campaignid=21131126073&gbraid=0AAAAADrbLljHp2gxDJC1HqFmI4-qgbfF_&gclid=Cj0KCQjw0NPGBhCDARIsAGAzpp2Q-cGTYl0YHo2T8Pc8-eUcpfHrTUn7InTSebnWlqIs1IWJiVAakbAaAjnLEALw_wcB", datasheet: "https://www.nemicon.co.jp/store-en/wp-content/uploads/pdf/18s.pdf", memo: "GRビーチについてるやつ" },
    { id: 5, part_name: "エンコーダー", part_number: "18S-300-2MD-2-15-00E", order_number: "", quantity: 1, price: 17980, sale_site: "https://www.monotaro.com/p/5299/2434/?srsltid=AfmBOorAdHsFFIbtUJJVfHB2Qhs6w68I8qY1a9ixHKgrAnQeGmHvBka8", datasheet: "https://www.hirose.c１om/product/document?clcode=CL0609-0033-6-00&productname=DM3AT-SF-PEJ2M5&series=DM3&documenttype=Catalog&lang=en&documentid=D49662_ja", memo: "300パルス ラインドライバー" },
    { id: 6, part_name: "ボリューム", part_number: "RDC506018A", order_number: "", quantity: 1, price: 300, sale_site: "https://www.digikey.jp/ja/products/detail/alps-alpine/RDC506018A/19529120?gclsrc=aw.ds&gad_source=1&gad_campaignid=179227047&gbraid=0AAAAADrbLljCzCWv-3qFNcgG6C0WwpZtS&gclid=Cj0KCQjw0NPGBhCDARIsAGAzpp36MJhd6YiLOu2262qjqbAytUwdz5qFcvjhh1m6FssDT6n8WngWLjwaArnBEALw_wcB", datasheet: "", memo: "M4のものマイコンカー販売と違う" },
    { id: 7, part_name: "USB-Cコネクタ", part_number: "USB4105-GF-A-120", order_number: "", quantity: 1, price: 125, sale_site: "https://www.digikey.jp/ja/products/detail/gct/USB4105-GF-A-120/14559044?gclsrc=aw.ds&gad_source=1&gad_campaignid=21131126052&gbraid=0AAAAADrbLlgxGmzY1XV9tOhLM25wdW0lQ&gclid=CjwKCAjw89jGBhB0EiwA2o1On06v_Od7pD0HcZp6KrgKh-GkOvsGR0Jjfzi15LN1OkM1FVcNndgiCBoCUfoQAvD_BwE", datasheet: "", memo: "データシート、CADモデルあり" },
    { id: 8, part_name: "ゲートドライバ", part_number: "A3921KLPTR-T", order_number: "", quantity: 5, price: 572, sale_site: "https://www.digikey.jp/ja/products/detail/allegro-microsystems/A3921KLPTR-T/4318337?gclsrc=aw.ds&gad_source=1&gad_campaignid=21131126073&gbraid=0AAAAADrbLljHp2gxDJC1HqFmI4-qgbfF_&gclid=CjwKCAjw89jGBhB0EiwA2o1On4tcLmvjVhe9LdZCl6pRXKHs_MxpGqCpugmN3IxSKfBj_ZiGB_Ek0hoCvTUQAvD_BwE", datasheet: "", memo: "" },
    { id: 9, part_name: "FETアレイ", part_number: "DMT3020LSDQ-13", order_number: "", quantity: 10, price: 149, sale_site: "https://www.digikey.jp/ja/products/detail/diodes-incorporated/DMT3020LSDQ-13/10674152", datasheet: "", memo: "FET2こいり" },
    { id: 10, part_name: "I2C接続小型キャラクターLCD", part_number: "AQM0802A-RN-GBW", order_number: "", quantity: 1, price: 550, sale_site: "https://akizukidenshi.com/catalog/g/g106669/", datasheet: "", memo: "I2C" },
    { id: 11, part_name: "モータードライブPWMピンFET", part_number: "2N7002-7-F", order_number: "", quantity: 5, price: 29, sale_site: "https://www.digikey.jp/ja/products/detail/diodes-incorporated/2N7002-7-F/717681", datasheet: "", memo: "" },
    { id: 12, part_name: "電流センサ", part_number: "CT426-HSN820MR", order_number: "", quantity: 5, price: 532, sale_site: "https://www.digikey.jp/ja/products/detail/allegro-microsystems/CT426-HSN820MR/22114059", datasheet: "", memo: "双方向 50mV/A" },
    { id: 13, part_name: "コネクタIfc 22p", part_number: "5051102296", order_number: "", quantity: 2, price: 148, sale_site: "https://www.digikey.jp/ja/products/detail/molex/5051102296/18110217?gclsrc=aw.ds&gad_source=1&gad_campaignid=20535386545&gbraid=0AAAAADrbLljOeIv6755uRWpuxS8CXqZ64&gclid=CjwKCAjwxfjGBhAUEiwAKWPwDg2cUO8WPCCHuOBKVYhAcBEOEVFpiTbLdbcvU-CDnPQR_0PX82wyGhoC2f0QAvD_BwE", datasheet: "", memo: "" },
    { id: 14, part_name: "電流センサ 2", part_number: "CT427-HSN820MR", order_number: "", quantity: 1, price: 532, sale_site: "https://www.digikey.jp/ja/products/detail/allegro-microsystems/CT427-HSN820MR/22114299", datasheet: "", memo: "" },
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
