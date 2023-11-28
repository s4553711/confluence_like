const pino = require('pino')
const fs = require('fs')
const TurndownService = require('turndown')
const TurndownPluginGfmService = require('@guyplusplus/turndown-plugin-gfm')
const TurndownPluginConfluenceToGfmService = require('turndown-plugin-confluence-to-gfm')

// set pino format
const logger = pino({
	transport: {
		target: 'pino-pretty'
	},
	options: {
		colorize: true
	}
})

const list_mapping = (v) => {
	return 'list.json'
}

module.exports = (req, res) => {
	let tid = req.params.id
	//let tlist = req.params.list
	let tlist = 'ck';
	logger.info(`Receive ${tid}`)

	let turndownService = new TurndownService({codeBlockStyle: 'fenced'})
	TurndownPluginGfmService.gfm(turndownService)
	TurndownPluginConfluenceToGfmService.confluenceGfm(turndownService)

	try {
	const test_json = `${__dirname}/../content/${tid}.json`
	let raw = fs.readFileSync(test_json)
	let parsed_data = JSON.parse(raw)
	let markdown = turndownService.turndown(parsed_data.body.view.value)
	logger.info(`Transform markdown`)

	// transform confluence url into new one
	markdown = markdown.replace(/\/pages\/viewpage\.action/g, "/page.html")
		.replace(/\/download\/attachments/g, '/api/download/attachments')

	// get article info from json
	let json_raw = fs.readFileSync(__dirname+'/../json/'+list_mapping(tlist))
	let ret = JSON.parse(json_raw)
	let target = ret.filter(row => row.id == tid)
	logger.info(`article info: (${target[0].id}) ${target[0].title}`)

	res.json({'status': 200, 'message': markdown, 'title': target[0].title})
	} catch(err) {
		logger.info(`${err}`)
		res.status(404).json({'status': 404, 'message': '', 'title': ''})
	}
}
