var mysql = require('mysql');

class MysqlClient {
    constructor(options = {}) {
        this.pool = mysql.createPool(options);
    }

    doQuery(query) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                if (err) {
                    return reject(err);
                }
                console.info('getConnection ok')
                conn.query(query, (err, results, fields) => {
                    conn.release();
                    if (err) {
                        return reject(err);
                    }
                    return resolve(results || null);
                })
            })
        });
    }
}

const options = {
    connectionLimit: 1000,
    host: '127.0.0.1',
    password: 'password',
    database: 'yiibaidb',
    user: 'root',
}

module.exports = new MysqlClient(options);