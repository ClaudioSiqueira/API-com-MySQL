const express = require('express')
const app = express()
const sequelize = require('sequelize')
const Table = require('./database/table')
const bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


app.get('/games', (req, res) =>{
    Table.findAll().then(games =>{
        res.statusCode = 200
        res.json(games)
    })
})


app.post('/game', (req, res) =>{
    let {title, price, year} = req.body

    if(isNaN(price) || isNaN(year) || title == undefined){
        res.sendStatus(400)
    }else{
        Table.create({
            title:title,
            price:price,
            year:year
        }).then(() =>{
            res.sendStatus(200)
        })
    }
})

app.delete('/game/:id', (req, res) =>{
    let id = req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        Table.findByPk(id).then(game =>{
            if(game != undefined){
                Table.destroy({
                    where:{id:id}
                }).then(res.sendStatus(200))
            }else{
                res.sendStatus(404)
            }
        })

    }
})


app.put('/game/:id', (req, res) =>{
    let id = req.params.id
    if(!isNaN(id)){

        Table.findByPk(id).then((game) =>{
            if(game != undefined){
                let {title, price, year} = req.body
                if(title != undefined){
                    Table.update({title: title}, {where:{id:id}})
                    res.sendStatus(200)
                }

                if(price != undefined){
                    Table.update({price:price}, {where:{id:id}})
                    res.sendStatus(200)
                }
                
                if(year != undefined){
                    Table.update({price: price}, {where:{id:id}})
                    res.sendStatus(200)
                }
            }else{
                res.sendStatus(404)
            }
        })





    }else{
        res.sendStatus(400)
    }
})

app.listen(9000, () =>{
    console.log('Servidor abriu')
})
