// console.log("Test");

const express = require ("express"); //сервер
const app = express();               //app - об"єкт сервера
const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    // database: "company"
});
db.connect(err => {                                
    if (err) {
      throw err;
      console.log("Connection error => ", err);
    }                                              //кидаємо помилку для перевірки
    console.log("Mysql server connected...");
});                                                //підключення до бази даних
app.get("/createdb", (reg,res) => {
    let sql = "CREATE DATABASE NTEST";             //sql команда для створення бази даних
    db.query(sql, (err, result) =>{                //запит(query) в базу даних
        if(err){
            throw err;
            console.log(err);
        }
        res.send("DATABASE CREATED");
    });                  
})                                                 //створення бази даних

app.get("/", (reg, res) => {
    // console.log(reg);
    res.send("server running");
} )                                  // шлях "/", параметри(reg, res)



app.listen("3000", () => console.log("server running"));