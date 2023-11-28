const pino = require('pino')
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname+'/../example.db');
const {promisify} = require('util');

// set pino format
const logger = pino({
	transport: {
		target: 'pino-pretty'
	},
	options: {
		colorize: true
	}
})

const add_note = (req, res) => {
	let title = req.body.title;
	let content = req.body.body;
	db.serialize(() => {
		const stmt = db.prepare("insert into notes (title, content) values(?,?)");
		//stmt.run("title2", "<h1>abc</h1><h2>1213</h2>");
		stmt.run(title, content);
		stmt.finalize();
		logger.info("write success");
	});

	//db.close();
	res.json({'status': 200})
}

const prepare = (sql) => new Promise((resolve, reject) => {
	const stmt = db.prepare(sql, err => {
		if (err===null)
			resolve(stmt);
		else
			reject(err);
	});
});

const getNotes = async (db, table) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM '${table}'`,(err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

const read_note = async (req, res) => {
	//let select = await prepare("select * from notes limit 10");
	//let all = await promisify(select.all.bind(select));
	//let ret = await all();
	let ret = await getNotes(db, 'notes');
	res.json({'status': 200, data: ret});
}

module.exports = {
	add_note,
	read_note
}
