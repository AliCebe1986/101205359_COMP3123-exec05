const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/profile', (req, res) => {
    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server Error');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server Error');
        } else {
            const user = JSON.parse(data);
            if (username !== user.username) {
                res.json({
                    "status": false,
                    "message": "User Name is invalid"
                });
            } else if (password !== user.password) {
                res.json({
                    "status": false,
                    "message": "Password is invalid"
                });
            } else {
                res.json({
                    "status": true,
                    "message": "User Is valid"
                });
            }
        }
    });
});

app.get('/logout/:username', (req, res) => {
    const username = req.params.username;
    res.send(`<b>${username} successfully logged out.</b>`);
});

app.use((err, req, res, next) => {
    res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
