const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


let db = new sqlite3.Database('./db/tasks.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the tasks database.');
});

db.run('CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)');


// get all tasks
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
        res.send(rows);
    });
});

app.post('/tasks', (req, res) => {
    const task = req.body.task;
    console.log(task);
    db.run('INSERT INTO tasks(task) VALUES(?)', [task], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
        res.send('Task created');
    });
});

app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const task = req.body.task;
    db.run('UPDATE tasks SET task = ? WHERE id = ?', [task, id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
        res.send('Task updated');
    });
});

app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
        res.send('Task deleted');
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});



