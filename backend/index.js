const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser');
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

let sess = {
	secret: 'happymeal',
	//resave: true,
	//saveUninitialized: true,
	cookie: {
		maxAge: 60*1000
	}
}

const isAuth = (req, res, next) => {
	logger.info('called authed');
	logger.info(req.session);
	if (req.session.login) {
		console.log('pass')
		next()
	} else {
		console.log('fail')
		//next('route')
		//res.redirect('/login')
		res.json({'status': 200, 'message': 'fail'})
	}
}

//app.use(cookieParser());
app.use(session(sess));
//app.use(isAuth);
app.use(cors());
app.use(express.json());

r.get('/', (req, res) => {
	res.json({'status': 200, 'message': 'ok'});
})

r.get('/login', (req, res) => {
	logger.info('called login');
	req.session.user = 'ck';
	req.session.login = true;
	res.json({'status': 200, 'ret': true, 'session': req.sessionID, 'user': req.session.user});
})

r.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		logger.info('logout ', err);
		logger.info(`session logout`);
	})
	res.json({'status': 200, 'ret': true});
});

r.get('/auth', (req, res) => {
	logger.info('Auth with session', req.session.sessionID);
	if (req.session.login) {
		res.json({'status': 200, 'ret': true, 'session': req.sessionID, 'user': req.session.user});
	} else {
		res.json({'status': 200, 'ret': false, 'session': req.sessionID, 'user': ''});
	}
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
r.post('/notes/edit', storage.edit_note)
r.get('/note/:id', storage.read_note)
r.get('/notes/read', storage.list_note)
r.use('/archive/:id', md_work)

app.use("/api", r);
app.use(express.static('public'))

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});


app.set('trust proxy' , true);
app.listen(port, () => {
	logger.info('Server is running on '+port)
})
