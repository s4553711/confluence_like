const pino = require('pino')
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname+'/../example.db');
const note_util = require('./note_work.js');
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

const edit_note = (req, res) => {
	let title = req.body.title;
	let content = req.body.body;
	let tid = req.body.tid;

	content = note_util.proc_img(content);
	logger.info(`filtered content ${content}`);

	db.serialize(() => {
		const stmt = db.prepare("update notes set title = ?, content = ?, updated = datetime() where id = ?");
		stmt.run(title, content, tid);
		stmt.finalize();
		logger.info(`update success (${tid})`);
	});
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
        db.all(`SELECT * FROM '${table}' order by updated desc`,(err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

const getNoteById = async (db, table, id) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM '${table}' where id = ${id}`,(err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

const list_note = async (req, res) => {
	//let select = await prepare("select * from notes limit 10");
	//let all = await promisify(select.all.bind(select));
	//let ret = await all();
	let ret = await getNotes(db, 'notes');
	let ret2 = ret.map((e) => ({avatar: 'http://127.0.0.1:3344/api/avatar/'+e.owner, ...e}))
	res.json({'status': 200, data: ret2});
}

const read_note = async (req, res) => {
	let tid = req.params.id
	console.log('receive ',tid);
	let ret = await getNoteById(db, 'notes', tid);
	res.json({'status': 200, data: ret[0]});
	
}

module.exports = {
	add_note,
	edit_note,
	list_note,
	read_note,
}
