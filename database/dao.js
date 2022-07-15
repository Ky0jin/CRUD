const pool = require('./config')

let operations = {
    save: function(aluno) {
        return pool.promise().execute('INSERT INTO alunos (nome, email, curso) VALUES (?, ?, ?)', [ aluno.nome, aluno.email, aluno.curso])
    },
    update: function(aluno) {
        return pool.promise().execute('update alunos set nome=?, email=?, curso=? where id=?', 
        [ aluno.nome, aluno.email, aluno.curso, aluno.id ] )
    },
    remove: function(id) {
        return pool.promise().execute('delete from alunos where id=?', [id])
    },
    list: function() {
        return pool.promise().query('select * from alunos')
    },
    findById: function(id) {
        return pool.promise().query('select * from alunos where id=?', [id])
    },
    search: function(nome) {
        return pool.promise().query('select * from alunos where nome like ?', [ '%'+nome+'%'])
    }
}

module.exports = operations;






// pool.promise().query('select * from alunos').then( ([ rows, fields ])  => {
//     console.log(rows)
// })