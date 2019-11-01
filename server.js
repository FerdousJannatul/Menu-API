
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var app = express();
var server = app.listen(8000);

app.use(express.static('website'));
console.log('Server is starting!');


app.get('/add/:id/:menusection', addMenusection);
function addMenusection(request, response) {

    var id = request.params.id;
    var menusection = request.params.menusection;

    db = new sqlite3.Database('menusection.sqlite3');

    db.serialize(function () {


            var add = db.prepare('INSERT INTO menu VALUES (?,?)');
            add.run(id, menusection);
            add.finalize();

            response.send('The menusection has been added successfully!')



            db.close()

    })

}

app.get('/all', sendAll);
function sendAll(request, response) {

    db = new sqlite3.Database('menusection.sqlite3');
    db.serialize(function () {

        db.each('SELECT id,menusection FROM menu', function (err, row) {
            console.log(row.id, row.menusection)
        });
    });

    response.send('The menu has been displayed on the console!');
    db.close();

}

app.get('/delete/:id', deleteMenusection);
function deleteMenusection(request, response) {

    var criterion = request.params.id;

    db = new sqlite3.Database('menusection.sqlite3');
    db.serialize(function () {


            var del = db.prepare('DELETE FROM menu WHERE id = ?');
            del.run(criterion);
            del.finalize();

            response.send('The menusection (if applicable) has been deleted successfully!')


            db.close()

    })

}

app.get('/search/:id', searchId);
function searchId(request, response) {

    var criterion = request.params.id;

    db = new sqlite3.Database('menusection.sqlite3');
    db.serialize(function () {

        db.each(`SELECT id,menusection FROM menu WHERE id = ${criterion}`, function (err, row) {
            console.log(row.id, row.menusection)
        });
    });

    response.send('The search results (if any) have been displayed on the console!');
    db.close();

}

