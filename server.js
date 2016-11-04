/*jslint node: true */
'use strict'

const chalk = require('chalk');
require('dotenv').config({
	silent: true
})

// var app = require('./app/app')
//require db here later

const app = require('./server/app')

const port = 2020

const server = app.listen(port, function(err) {
	if (err) throw err
	console.log(chalk.blue('Server listening on port', port))
})

module.exports = server
