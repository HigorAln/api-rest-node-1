const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const e = require("express");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var DB = {
    games: [
        {
            id:23,
            title: "Call of Duty MW",
            year: 2019,
            price:200
        },
        {
            id:534,
            title: "Destiny",
            year: 2005,
            price:69
        },
        {
            id:290,
            title: "Minecraft",
            year: 2000,
            price:0
        },
    ]
}

app.get('/games',(req,res)=>{
    res.statusCode= 200;
    res.json(DB.games)
})

app.get('/game/:id',(req,res)=>{
    if(!isNaN(req.params.id)){
        var id = parseInt(req.params.id)
        var games = DB.games.find(g => g.id == id)
        if(games){
            res.json(games)
        }else{
            res.sendStatus(404)
        }
    }else{
        res.json({error: 404})
    }
})

app.post('/game',(req,res)=>{
    var { title, price, year } = req.body

        DB.games.push({
            id: 2549,
            title,
            price,
            year
        })
        res.sendStatus(200)
})

app.delete('/game/:id',(req,res)=>{
    if(!isNaN(req.params.id)){
        var id = parseInt(req.params.id)
        var game = DB.games.findIndex(g=>g.id ==id);

        if(game == -1){
            res.sendStatus(404)
        }else{
            DB.games.splice(game,1);
            res.sendStatus(200)

        }
    }else{
        res.json({error: 404})
    }
    
})

app.put('/game/:id',(req,res)=>{
    if(!isNaN(req.params.id)){
        var id = parseInt(req.params.id)
        var games = DB.games.find(g => g.id == id)

        if(games){
           
            var {title, price, year} = req.body;

            if(title != undefined){
                games.title = title;
            }
            if(price != undefined){
                games.price = price;
            }
            if(year != undefined){
                games.year = year;
            }
            res.sendStatus(200)

        }else{
            res.sendStatus(404)
        }
    }else{
        res.json({error: 404})
    }
})


const port = process.env.PORT || 3005
app.listen(port, (err)=>{
    console.log(`Servidor rodando na porta ${port}`)
})