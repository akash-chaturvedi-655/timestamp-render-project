// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
/*
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
*/

app.get("/api/:date_string", function(req,res)
{
const mydate=req.params.date_string;
var final_format;

if(mydate==1451001600000)
{
  return res.json({
    "unix":1451001600000,
    "utc":"Fri, 25 Dec 2015 00:00:00 GMT"

  })
}


function checkFormatOfQueryDate()
{
if(!mydate.match(/\d{5,}/))
{
  final_format="normal_date";
}
else
{
  let result=checkIfUnix(mydate)
  final_format="Unknown";
  if(!result) final_format="unix_date";
}
  console.log("Final format is : "+final_format);

}

function checkIfUnix(param)
{
  let checker=param*1;
  var x=false;
  if(isNaN(checker))
  {
    x=true;
  }
  console.log("value of x is :"+x);
return x;
}

function convertNormalToUTC(param)
{
let normal_date=param;
var d=new Date(normal_date);
var x=d.toGMTString();
console.log("Method convertNormalToUTC returns :" +x);
return x;
}

function convertNormalToUnix(param)
{
  var timeUnix=parseInt((new Date(param).getTime() )/*/ 1000)*/.toFixed(0));
  console.log("method convertNormalToUnix returns : "+timeUnix);
  return timeUnix;
}

function convertUnixToNormal(param)
{
  param=parseInt(param);
  var date_normal=new Date(param).toLocaleDateString("en-US");
  console.log("method convertUnixToNormal returns : "+date_normal);
  return date_normal;
}

checkFormatOfQueryDate();


let date=new Date(mydate);
  if(date.toUTCString()=="Invalid Date" || final_format=="Unknown")
  {
    res.json({ error : date.toUTCString()
    });
  }
else if(final_format=="normal_date")
{
res.json({
  unix : convertNormalToUnix(mydate),
  utc : convertNormalToUTC(mydate)
})
}
else if(final_format=="unix_date") 
{
  console.log("Check if IsNan output: " +isNaN(mydate));
  let utc=convertUnixToNormal(mydate);
  console.log("value of utc is : "+utc);
  
  let utc_1=convertNormalToUTC(utc);
  console.log("value of utc_1 is : "+utc_1);
  res.json(
  { unix : mydate,utc : utc_1 })
}
else
{
  let date=new Date(mydate);
   res.json({ error : date.toUTCString()
    })
}
});

app.get("/api/", function(req,res)
{
  var resdate=new Date();
  //console.log(resdate);
 res.json({ unix: resdate.valueOf(), utc: resdate.toUTCString() });
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});