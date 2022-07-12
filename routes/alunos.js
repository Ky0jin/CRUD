

var express = require('express');
var router = express.Router();

router.get('/', function (request, response) {
    response.render('alunos/list')
})

router.get('/form', function (request, response) {
    response.render('alunos/form')
})

module.exports = router;