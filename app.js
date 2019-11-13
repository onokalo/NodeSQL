// console.log("Test");

const express = require ("express"); //сервер
const app = express();               //app - об"єкт сервера
const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    // user: "root",
    user: "companyUser",
    // password: "",
    password: "companyUser",
    // database: "company"
    database: "company"
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

app.get("/createposttable", (req, res) => {
    let sql =
      "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), prev VARCHAR(128), single_post VARCHAR(255), author VARCHAR(255), PRIMARY KEY (id))";
    db.query(sql, (err, result) => {
      console.log(result);
      res.send("Table created...");
    });
  });
  
  app.get("/addpost", (req, res) => {
    let post = {
      title: "First post",
      prev: "Start post",
      single_post: "This is a full post",
      author: "Bart Simpson"
    };
  
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) => {
      if (err) throw err;
      console.log("Insert post result => ", result);
      res.send("Post added...");
    });
  });
  
  app.get("/getposts", (req, res) => {
    let sql = "SELECT * FROM posts";
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      console.log("SELECT posts result => ", results);
      res.send("Posts fatched...");
    });
  });
  
  app.get("/getpost/:id", (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      console.log("SELECT posts result => ", results);
      res.send("Post fatched...");
    });
  });
  
  app.get("/updatepost/:id", (req, res) => {
    let newTitle = "After update!";
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Issue =>", err);
  
      console.log("UPDATE posts result => ", result);
      res.send("UPDATE ...");
    });
  });
  app.get("/deletepost/:id", (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Issue =>", err);
  
      console.log("Delete posts result => ", result);
      res.send("Delete ...");
    });
  });

app.get("/", (reg, res) => {
    // console.log(reg);
    res.send("server running");
} )                                  // шлях "/", параметри(reg, res)

app.listen("3000", () => console.log("server running"));