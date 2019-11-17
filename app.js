// console.log("Test");

const express = require ("express"); //сервер
const app = express();               //app - об"єкт сервера
const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    // user: "companyUser",
    password: "",
    // password: "companyUser",
    database: "company"
    // database: "blog"
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
      "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), preview VARCHAR(128), single_post VARCHAR(255), author VARCHAR(255), PRIMARY KEY (id))";
    db.query(sql, (err, result) => {
      if (err){
        throw err;
        console.log(err);
      }
      console.log(result);
      res.send("Table created...");
    });
  });
  
  app.get("/addpost", (req, res) => {
    let post = {
      title: "First post",
      preview: "Start post",
      single_post: "This is a full post",
      author: "Bart Simpson"
    };
  
    let sql = "INSERT INTO posts SET ?";
    db.query(sql, post, (err, result) => {
      if (err) throw err;
      console.log("Insert post result => ", result);
      res.send("Post added...");
    });
  });
  
  app.get("/getposts", (req, res) => {
    let sql = "SELECT * FROM posts";
    db.query(sql, (err, results) => {
      if (err) throw err;
      console.log("SELECT posts result => ", results);
      // res.send("Posts fatched...");
      res.send(result);
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
      // res.send("UPDATE ...");
      res.send(result);
    });
  });
  app.get("/deletepost/:id", (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Issue =>", err);
  
      console.log("Delete posts result => ", result);
      // res.send("Delete ...");
      res.send(result);
    });
  });

  // Company 

// app.get("/task1", (req, res) => {
//   let sql = "SELECT * FROM customers;";
//   db.query(sql, (err, result) => {
//     if (err){
//       throw err;
//       console.log(err);
//     }
//     res.send(result);
//   })
// })

app.get("/task1", (reg,res) =>{
  let sql = "SELECT onum, amt, odate FROM orders;";
  db.query(sql, (err, result) => {
    if(err){
      throw err;
      console.log(err);
    }
    res.send(result);
  })
})

app.get("/task2", (reg,res) => {
  let sql = "SELECT * FROM customers WHERE snum = 1001;";
  db.query(sql, (err, result) => {
    if (err){
      throw err;
      console.log(err);
    }
    res.send(result);
  })
})

app.get("/task3", (reg,res) => {
  let sql = "SELECT cname, rating FROM customers WHERE city = 'San Jose';";
  db.query(sql, (err, result) => {
    if(err){
      throw err;
      console.log(err);
    }
    res.send(result);
  })
})

app.get("/task4", (reg, res) => {
  let sql = "SELECT DISTINCT snum FROM orders;";
  db.query(sql, (err, result) => {
    if(err){
      throw err;
      console.log(err);
    }
    res.send(result);
  })
})

app.get("/task5", (reg,res) => {
  let sql = "SELECT * FROM orders WHERE amt > 1000;";
  db.query(sql, (err, result) => {
    if(err){
      throw err;
      console.log(err);
    }
    res.send(result);
  })
})

app.get("/task6", (reg,res) => {
  let sql = "SELECT city, sname FROM salers WHERE city = 'London' AND comm > 0.11;";
  db.query(sql, (err, result) => {
    if(err){
      throw err;
      console.log(err);
    }
    res.send(result);
  }) 
})

app.get("/task7", (reg,res) => {
  let sql = "SELECT * FROM customers WHERE rating <= 100 AND NOT city = 'Rome';";
  db.query(sql, (err,result) => {
    if(err){
      throw err;
      console.log(err);
    }
    res.send(result);
  })
})

app.get("/task8", (reg,res) => {
  let sql = "SELECT * FROM salers WHERE comm <= 0.12;";
  db.query(sql, (err,result) => {
    if(err){
      throw err;
      console.log(err);
    }
    res.send(result);
  })
})

app.get("/task9", (reg,res) => {
  let sql = "SELECT * FROM orders WHERE (amt < 1000 OR NOT (odate = '1990-03-10' AND cnum > 2003));";
  db.query(sql, (err, result) => {
    if(err){
      throw err;
      console.log(err);
    }
    res.send(result);
  })
})

app.get("/task10", (reg,res) => {
  let sql = "SELECT * FROM orders WHERE odate IN('1990-03-10','1990-04-10');";
  db.query(sql, (err, result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task11", (reg,res) => {
  let sql = "SELECT cname FROM customers WHERE snum IN(SELECT snum FROM salers WHERE sname IN('Peel','Motika'));";
  db.query(sql, (err, result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task12", (reg,res) => {
  let sql = "SELECT cname FROM customers WHERE cname BETWEEN 'A' AND 'H';";
  db.query(sql, (err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task13", (reg,res) => {
  let sql = "SELECT sname FROM salers WHERE sname LIKE 'C%';";
  db.query(sql, (err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task14", (reg,res) => {
  let sql = "SELECT sname FROM salers WHERE sname LIKE 'D%' AND sname LIKE '%n';";
  db.query(sql, (err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task15", (reg,res) => {
  let sql = "SELECT sname FROM salers WHERE sname LIKE '%n' AND sname NOT LIKE 'D%';";
  db.query(sql, (err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task16", (reg,res) => {
  let sql = "SELECT * FROM salers WHERE sname IS NULL;";
  db.query(sql, (err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task17", (reg,res) => {
  let sql = "SELECT ((SELECT SUM(amt) FROM orders) / (SELECT COUNT(amt) FROM orders)) AS result;";
  db.query(sql,(err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task18", (reg,res) => {
  let sql = "SELECT SUM(amt) FROM orders WHERE snum = 1007;";
  db.query(sql, (err, result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task19", (reg,res) => {
  let sql = "SELECT city, MAX(rating) FROM customers GROUP BY city;";
  db.query(sql, (err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task20", (reg,res) => {
  let sql = "SELECT city, MIN(comm) FROM  salers GROUP BY city;";
  db.query(sql, (err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task21", (reg,res) => {
  let sql = "SELECT * FROM orders WHERE odate = '1990-03-10' ORDER BY amt ASC;";
  db.query(sql, (err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task22", (reg,res) => {
  let sql = "SELECT * FROM orders ORDER BY odate DESC LIMIT 2;";
  db.query(sql, (err, result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task23", (reg,res) => {
  let sql = "SELECT c.cname, c.rating, c.city, s.sname FROM customers c, salers s WHERE c.snum = s.snum AND c.rating > 200;";
  db.query(sql, (err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task24", (reg,res) => {
  let sql = "SELECT 'Продавец: ', sname, 'Сумма продажи: ', amt, 'Размер комиссионных: ', (amt*comm) AS res FROM salers, orders WHERE salers.snum = orders.snum;";
  db.query(sql, (err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task25", (reg,res) => {
  let sql = "SELECT sname, CHAR_LENGTH(sname) FROM salers WHERE CHAR_LENGTH(sname) >= 6;";
  db.query(sql, (err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task26", (reg,res) => {
  let sql = "SELECT onum, amt, REPLACE(odate, '-', '/') AS odate, cnum, snum FROM orders;";
  db.query(sql, (err, result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task27", (reg,res) => {
  let sql= "SELECT amt, SUBSTRING_INDEX(amt, '.', 1) AS amt FROM orders;";
  db.query(sql, (err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task28", (reg,res) => {
  let sql = "SELECT SUBSTRING_INDEX(REPLACE(odate, '-', '/'), '/', -2) AS odate FROM orders;";
  db.query(sql, (err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

app.get("/task29", (reg,res) => {
  let sql = "SELECT * FROM salers WHERE CHAR_LENGTH(sname) <> LENGTH(sname);";
  db.query(sql, (err,result) => {
    throw err;
    console.log(err);
  })
  res.send(result);
})

 
app.get("/", (reg, res) => {
    // console.log(reg);
    res.send("server running");
} )                                  // шлях "/", параметри(reg, res)

app.listen("3000", () => console.log("server running"));