const pool = require('../data/config');

const router = app => {
    app.get('/answers', (request, response) => {
        pool.query("SELECT * FROM answers", (err, answers) => {
            if (err) {
                console.log('err', err);
            } else {
                response.send(answers);
            }
        })  
    })

    app.get('/reactions', (request, response) => {
        pool.query("SELECT * FROM reactions_pack", (err, reactions) => {
            if (err) {
                console.log('err', err);
            } else {
                response.send(reactions);
            }
        })  
    })

    app.get('/reactions/:id', (request, response) => {
        const id = request.params.id;
         pool.query("SELECT * FROM reactions WHERE id = ?", id, (err, reaction) => {
            if (err) {
                console.log('err', err)
            } else {
                response.send(reaction);
            }
        })  
    })

    app.post('/results', (request, response) => {
        pool.query(`INSERT INTO results (id_pack, id_reaction, id_answer) VALUES (${request.body.id_pack}, ${request.body.id_reaction}, ${request.body.id_answer})`, request.body, (error, result) => {
            if(error) {
                console.log(error);
            } else {
                response.send(result);
            }
        })
       
    })
}

module.exports = router;
