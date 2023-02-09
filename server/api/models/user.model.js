const connection = require('../models/config');
const jwt = require("jsonwebtoken");

class User {
    static getAll(cb) {
        connection.query('SELECT * FROM user', (err, data) => {
            cb(err, data);
        });
    }

    static create(user, cb) {
        connection.query(
            'INSERT INTO user SET ?',
            user,
            (err, data) => {
                if (err) {
                    return cb(err);
                }
                cb(null, jwt.sign({ id: data.insertId }, process.env.SECRET_KEY));
            }
        );
    }

    static update(id, user, cb) {
        connection.query(
            'UPDATE user SET ? WHERE id = ?',
            [user, id],
            (err, data) => {
                cb(err, data);
            }
        );
    }

    static find(column, value, cb) {
        connection.query(`SELECT * FROM user WHERE ${column} = '${value}'`, (err, data) => {
            cb(err, data);
        });
    }

    static delete(id, cb) {
        connection.query('DELETE FROM user WHERE id = ?', id, (err, data) => {
            cb(err, data);
        });
    }
}

module.exports = User;
