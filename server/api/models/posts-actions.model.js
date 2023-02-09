const connection = require('../models/config');

class PostsActions {
    static getAll(cb) {
        connection.query('SELECT * FROM post_actions', (err, data) => {
            cb(err, data);
        });
    }

    static create(post_actions, cb) {
        connection.query(
            'INSERT INTO post_actions SET ?',
            post_actions,
            (err, data) => {
                cb(err, data);
            }
        );
    }

    static update(id, post_actions, cb) {
        connection.query(
            'UPDATE post_actions SET ? WHERE id = ?',
            [post_actions, id],
            (err, data) => {
                cb(err, data);
            }
        );
    }

    static find(column, value, cb) {
        connection.query(`SELECT * FROM post_actions WHERE ${column} = '${value}' ORDER BY updated_at DESC`, (err, data) => {
            cb(err, data);
        });
    }

    static findByPost(user_id, post_id, cb) {
        connection.query(`SELECT * FROM post_actions p WHERE p.user_id = '${user_id}' AND p.post_id = '${post_id}'`, (err, data) => {
            cb(err, data);
        });
    }

    static delete(id, cb) {
        connection.query('DELETE FROM post_actions WHERE id = ?', id, (err, data) => {
            cb(err, data);
        });
    }
}

module.exports = PostsActions;
