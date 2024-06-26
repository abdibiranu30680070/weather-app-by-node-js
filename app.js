const express = require("express");
const axios = require("axios");
const bodyparser=require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
  
app.post("/", (req ,res)=>{
    const query=req.body.cityName;
    const apiKey = "95367f787173ba331069d6db52ca1f81";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
    axios.get(url)
        .then(response => {
            const weatherData = response.data;
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            
            res.write(`<h1>The temperature in ${query} is ${temp} degrees Celsius.</h1>`);
            res.write(`The weather is currently ${weatherDescription}`);
            res.write(`<img src="${imageUrl}">`);
            res.send();
        })
        .catch(error => {
            res.status(500).send("Error fetching weather data");
        });
});
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
