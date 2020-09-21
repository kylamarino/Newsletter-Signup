const bodyParser = require('body-parser');
const express = require('express');
const https = require("https");
const request = require('request');


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email= req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);

  const url="https://us2.api.mailchimp.com/3.0/lists/b1841d4013"

  const options = {
    method: "POST",
    auth: "kyla1:68355636f2467643e616d7bb479fd794- us2"
  }

  const request = https.request(url, options, function(response){
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      const jsonData = JSON.parse(data);

    })
  });

  app.post("/failure", function(req,res){
    res.redirect("/");
  });

  request.write(jsonData);
  request.end();

  console.log(fName, lName, email);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000");
});


// apiKey= "68355636f2467643e616d7bb479fd794-us2"
//listId= "b1841d4013";
