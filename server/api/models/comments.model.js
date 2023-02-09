const connection = require('../models/config');

class Comments {
    static getAll(cb) {
        connection.query('' +
            'SELECT p.*, u.name as user_name FROM comment p ' +
            'LEFT JOIN user u ON u.id = p.user_id ' +
            'WHERE status = "publish" ' +
            '', (err, data) => {
            cb(err, data);
        });
    }

    static create(comment, cb) {
        connection.query(
            'INSERT INTO comment SET ?',
            comment,
            (err, data) => {
                cb(err, data);
            }
        );
    }

    static update(id, comment, cb) {
        connection.query(
            'UPDATE comment SET ? WHERE id = ?',
            [comment, id],
            (err, data) => {
                cb(err, data);
            }
        );
    }

    static find(column, value, cb) {
        connection.query(`` +
            `SELECT c.*, u.name as user_name
             FROM comment c ` +
            `LEFT JOIN user u ON u.id = c.user_id ` +
            `WHERE c.${column} = '${value}' ORDER BY updated_at DESC`, (err, data) => {
            cb(err, data);
        });
    }

    static findByUser(user_id, cb) {
        connection.query(`SELECT p.*,
                                 c.id          as id_comment,
                                 c.description as comment,
                                 c.user_id     as user_id_comment,
                                 c.created_at     as comment_created_at,
                                 u.name
                          FROM post p
                                   LEFT JOIN comment c ON c.post_id = p.id
                                   LEFT JOIN user u ON u.id = c.user_id
                          WHERE p.user_id = ${user_id} AND c.removed_by IS NULL`, (err, data) => {
            cb(err, data);
        });
    }


        static
        delete (id, cb)
        {
            connection.query('DELETE FROM comment WHERE id = ?', id, (err, data) => {
                cb(err, data);
            });
        }
    }

    module
.
    exports = Comments;
