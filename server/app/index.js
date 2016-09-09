'use strict'

var express = require('express')
var app = require('express')()
var path = require('path')
var watson = require('watson-developer-cloud')

app.use(express.static(__dirname + '../public'))
app.use(require('./request-state.middleware'))
app.use(require('./statics.middleware'))

var alchemyLanguage = new watson.AlchemyLanguageV1({
	api_key: process.env.ALCHEMY_LANGUAGE_API_KEY	
})

app.get('/', function(req, res) {
	res.sendFile('/')
})

app.post('/api/:method', function(req, res, next) {
	var method = req.params.method
	if (typeof alchemyLanguage[method] === 'function') {
		alchemyLanguage[method](req.body, function(err, response) {
			if (err) {
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
