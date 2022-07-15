const { response } = require('express');
var express = require('express');
var router = express.Router();
let dao = require('../database/dao')

router.get('/', function (request, response) {
    dao.list().then( ([ rows ]) => {
        response.render('alunos/list', { alunos: rows})
    }).catch(err => {
        console.log(err)
        response.render('alunos/list', { alunos: [] })
    })
})

router.get('/form', async function (request, response) {
    let row = {
        id: '',
        nome: '',
        email: '', 
        curso: ''
    }
    if ( request.query.id ) {
        [ result ] = await dao.findById(request.query.id)
        console.log(result)
        row = result[0]
        console.log(row)
    }
    response.render('alunos/form', { aluno: row })
})

router.post('/delete', function(request, response) {
    dao.remove(request.body.id)
    .then( ([ result ]) => {
        
        if (result.affectedRows > 0) {
            request.flash('success', 'Aluno excluido com sucesso.')
        } else {
            request.flash('success', `Nao foi encontrado no banco aluno com id = ${request.body.id}`)
        }
        response.redirect('/alunos')
    }).catch(err => {
        console.log(err)
        request.flash('error', 'Ocorreu um erro na exclusao do aluno')
        response.redirect('/alunos')
    })
})

router.post('/save', function (request, response) {
    console.log(request.body.id)
    if (request.body.id > 0) {
        operacao = dao.update
        success = 'Dados do aluno atualizados com sucesso'
    } else if (request.body.id == false) {
        operacao = dao.save
        success = 'Aluno cadastrado com sucesso'
    }

    operacao(request.body)
    .then( ([ result ]) => {
        request.flash('success', success)
        response.redirect('/alunos')
    }).catch( err => {
        console.log(err)
        request.flash('error', 'Nao foi possivel cadastrar o aluno')
        response.redirect('/alunos')
    })
})

router.get('/search', function(request, response) {
    if (request.query.nome) {
        dao.search(request.query.nome)
        .then( ([rows]) => {
            response.render('alunos/list', { alunos: rows })
        }).catch( err => {
            console.log(err)
            request.flash('error', 'Nao foi possivel efetuar a busca por nome')
            response.redirect('/alunos')
        })
    } else {
        response.redirect('/alunos')
    }
})

module.exports = router;