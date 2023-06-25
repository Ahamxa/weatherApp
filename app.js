const express=require("express");
const bodyParser=require("body-parser");
const http=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){

    res.sendFile(__dirname+"/index.html");

});

app.post('/', function(req, res){

    var cityName=req.body.cityName;
    
    const query=cityName;
    const appid="8fdadfab617d7d318d5e5c83645036b7";
    const units="metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units;
    http.get(url, function(response){

        response.on("data",function(data){

            const WeatherObj=JSON.parse(data);
            const temp=WeatherObj.main.temp;
            const feelsLike=WeatherObj.main.feels_like;
            const disc=WeatherObj.weather[0].description;
            const icon=WeatherObj.weather[0].icon;
            const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<h1> Temperature In "+cityName+" Is "+temp+" Celcius degree </h1>");
            res.write("<h2> Feels like "+feelsLike+" Celcius degree </h1>");
            res.write("<p> condition: "+disc+"</p>");
            res.write("<img src="+imgUrl+">");
            res.send();

        });

    });


});


app.listen(process.env.PORT||3000, function(){
    console.log("server is listen on port 30000");
});