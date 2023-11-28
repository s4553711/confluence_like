const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const pino = require('pino');
const path = require('path');
const md_work = require('./src/md_work');
const storage = require('./src/storage');
const r = express.Router();
const port = 3344;

const logger = pino({
	transport: {
		target: 'pino-pretty'
	},
	options: {
		colorize: true
	}
});

app.use(cors());
app.use(express.json());

r.get('/', (req, res) => {
	res.json({'status': 200, 'message': 'ok'});
})

r.get('/list', (req, res) => {
	let raw = fs.readFileSync(__dirname+'/json/list.json');
	let ret = JSON.parse(raw);
	res.json({'status': 200, 'articles': ret});
})

r.get('/download/attachments/:id/:f', (req, res) => {
	logger.info(`${req.params.f}, ${req.params.id}`)
	let targetF = encodeURI(req.params.f)
	let reqF = `${__dirname}/attachments/${req.params.id}/${targetF}`
	logger.info(reqF)

	try {
		res.sendFile(reqF);
	} catch (err) {
		logger.info(err.message)
	}
})

r.post('/notes/add', storage.add_note)
r.get('/notes/read', storage.read_note)
r.use('/note/:id', md_work)

app.use("/api", r);
app.use(express.static('public'))

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(port, () => {
	logger.info('Server is running on '+port)
})
