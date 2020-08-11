const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const query = req.body.cityname;
  const unit = req.body.unitname;

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=9d03bcdc5218cb408358921d6a50e88b";

  https.get(url, function(res2) {

    res2.on("data", function(event) {

      const weather_data = JSON.parse(event);

      const weather_description = weather_data.weather[0].description;
      const temp = weather_data.main.temp;
      const icon = weather_data.weather[0].icon;
      const img_url = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The current temperature is " + temp + " degrees</h1>");
      res.write("<h3>The current weather is " + weather_description + "</h3>");
      res.write("<img src=" + img_url + " alt=weather_img>");
      res.send();

    });

  });
});




app.listen(3000, function() {
  console.log("server started on port 3000");
});
