const connection = require('../models/config');

class Post {
    static getAnalytics(cb) {
        connection.query('' +
            'SELECT p.*, u.name as user_name, COUNT(c.id) as comment_count, SUM(pa.type = 1) as likes_count, SUM(pa.type = 0) as unlike_count \n' +
            'FROM post p ' +
            'LEFT JOIN user u ON u.id = p.user_id ' +
            'LEFT JOIN comment c ON c.post_id = p.id ' +
            'LEFT JOIN post_actions pa ON pa.post_id = p.id ' +
            'GROUP BY p.id ' +
            'ORDER BY updated_at DESC', (err, data) => {
            cb(err, data);
        });
    }

    static getAll(cb) {
        connection.query('' +
            'SELECT p.*, u.name as user_name FROM post p ' +
            'LEFT JOIN user u ON u.id = p.user_id ' +
            'WHERE status = "publish" ' +
            '', (err, data) => {
            cb(err, data);
        });
    }

    static create(post, cb) {
        connection.query(
            'INSERT INTO post SET ?',
            post,
            (err, data) => {
                cb(err, data);
            }
        );
    }

    static update(id, post, cb) {
        connection.query(
            'UPDATE post SET ? WHERE id = ?',
            [post, id],
            (err, data) => {
                cb(err, data);
            }
        );
    }

    static find(column, value, cb) {
        connection.query(`` +
            `SELECT p.*, u.name as user_name, COUNT(c.id) as comment_count FROM post p ` +
            `LEFT JOIN user u ON u.id = p.user_id ` +
            `LEFT JOIN comment c ON c.post_id = p.id ` +
            `WHERE p.${column} = '${value}' ` +
            `GROUP BY p.id ` +
            `ORDER BY updated_at DESC`, (err, data) => {
            cb(err, data);
        });
    }

    static delete(id, cb) {
        connection.query('DELETE FROM post WHERE id = ?', id, (err, data) => {
            cb(err, data);
        });
    }
}

module.exports = Post;
