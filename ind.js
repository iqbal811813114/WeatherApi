const express = require("express")
const app = express()
const http=require("https")
const bodyParser=require("body-parser")

app.use(bodyParser.urlencoded({extended:true}))

app.post("/",function(req,res){
    const city=req.body.city1

    console.log(city)

    const url="https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid=07f2dcaf1d292ddb299dc12540cc1312";
    http.get(url,function(resp){
        console.log(resp.statusCode)
        resp.on("data",function(d){
            const weatherdata= JSON.parse(d)
            console.log(weatherdata)
            const temp = weatherdata.main.temp
            const weatherdesc=weatherdata.weather[0].description
            const icone=weatherdata.weather[0].icon
            const imgurl="http://openweathermap.org/img/wn/"+icone+"@2x.png"
            res.setHeader("Content-Type", "text/html"); 
            res.write("<span><h1>The temperature in "+city+" is "+ temp+"</h1></span>"+"<img src ="+ imgurl+ ">")
            res.send()
            
        }) 
    })
})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/ind.html")
})

app.listen(3000,function(req,res){
    console.log("running")
})