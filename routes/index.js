const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose=require('mongoose');
bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
});