'use strict'

var path = require('path')
var express = require('express')
var router = express.Router()

var rootPath = path.join(__dirname, '..', '..')

var publicPath = path.join(rootPath, 'public')

router.use(express.static(publicPath))
router.use(express.static(rootPath))

module.exports = router
