const connection = require('../models/config');

class PostsHistory {
    static getAll(cb) {
        connection.query('SELECT * FROM post_history', (err, data) => {
            cb(err, data);
        });
    }

    static create(post, cb) {
        connection.query(
            'INSERT INTO post_history SET ?',
            post,
            (err, data) => {
                cb(err, data);
            }
        );
    }

    static update(id, post, cb) {
        connection.query(
            'UPDATE post_history SET ? WHERE id = ?',
            [post, id],
            (err, data) => {
                cb(err, data);
            }
        );
    }

    static find(column, value, cb) {
        connection.query(`SELECT * FROM post_history WHERE ${column} = '${value}' ORDER BY created_at DESC`, (err, data) => {
            cb(err, data);
        });
    }

    static delete(id, cb) {
        connection.query('DELETE FROM post_history WHERE id = ?', id, (err, data) => {
            cb(err, data);
        });
    }
}

module.exports = PostsHistory;
