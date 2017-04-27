// basic route (http://localhost:8080)
const express = require('express');
var busboy = require('connect-busboy');
var csv = require('csv-parser')
import parser from './data-parser/data-parser.js';
import csvConverter from './csv-converter/csv-converter.js';

var apiRoutes = express.Router();

export default function({
    app,
    Expense
}) {

    //busboy is for uploading multipart forms (csv files here)
    app.use(busboy());

    apiRoutes.get('/', function(req, res) {
        res.send('Hello! this is budgetqt backend!');
    });

    apiRoutes.get('/expenses', function(req, res) {
        Expense.find({}).sort('-date').exec((err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            res.send(data);
        });
    });

    apiRoutes.post('/expenses', function(req, res) {
        let newExpense = new Expense(req.body);
        Expense.save(newExpense, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            res.send(data);
        });
    });

    apiRoutes.put('/expenses', (req, res) => {
      //take the imported expense, format it and add it to the expenses collection
      let expense = req.body;
      let newExpense = {title:expense.title,amount:expense.amount,date:expense.date,tags:expense.tags}
      Expense.findOneAndUpdate({_id:expense._id}, newExpense, {
        upsert: false
      }, function(err, doc) {
        if (err) return res.send(500, {error: err});
        res.send(newExpense);
      });
    });

    apiRoutes.post('/expenses', function(req, res) {
      let newExpense = new Expense(req.body);
      Expense.save(newExpense, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        res.send(data);
      });
    });

    apiRoutes.delete('/expenses', (req, res) => {
      let expense = req.body;
      //remove the imported expense
      Expense.find({
        _id: expense["_id"]
      }).remove().exec((err) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).send();
      });
    });

    apiRoutes.get('/expenses/export/csv', (req, res) => {
      Expense.find({}, (err, data) => {
          if (err) {
              console.log(err);
              return res.status(500).send(err);
          }
          res.setHeader('Content-disposition', 'attachment; filename=expenses.csv');
          res.set('Content-Type', 'text/csv');
          let csvFile = csvConverter(data);
          res.status(200).send(csvFile);
      });
    });

    apiRoutes.post('/expenses/upload/csv', function(req, res) {
        if (req.busboy) {
            req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
                file.pipe(csv()).on('data', (entry) => {

                    var expense = parser({
                        entry
                    });

                    expense.title = filename;

                    Expense.update(
                      {date:expense.date,amount:expense.amount,tags:{$in: expense.tags}},
                      {$setOnInsert: expense},
                      {upsert: true},
                      function(err, numAffected) {
                        if(err){
                          return res.status(500).send(err);
                        }
                      }
                    );
                })
            });
            req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {});
            req.pipe(req.busboy);
        }
        res.send('You have uploaded the file!');
    });

    return apiRoutes;
}
