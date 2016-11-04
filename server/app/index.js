'use strict'

var express = require('express')
var app = require('express')()
var path = require('path')
var watson = require('watson-developer-cloud')

var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(require('./request-state.middleware'))
// app.use(require('./statics.middleware'))
var rootPath = path.join(__dirname, '..', '..')

var publicPath = path.join(rootPath, 'public')

app.use(express.static(publicPath))
app.use(express.static(rootPath))

var alchemyLanguage = new watson.AlchemyLanguageV1({
	api_key: process.env.API_KEY	
})

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '../../public', 'index.html'))
})

app.post('/api/:method', function(req, res, next) {
	var method = req.params.method
	if (typeof alchemyLanguage[method] === 'function') {
		alchemyLanguage[method](req.body, function(err, response) {
			if (err) {
				console.log(err)
				return next(err)
			}
			return res.json(response)
		})
	} else {
		next({code: 404, error: 'Alchemy doesn\'t recognize the ' + method + ' call.'})
	}
})

app.use('/api', require('../api/api.router'))

module.exports = app
