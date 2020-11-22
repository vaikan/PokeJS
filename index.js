var express = require("express");
var app = express();

app.disable("x-powered-by");

app.set("port", process.env.PORT || 5000);
app.use(express.static(__dirname + "/src"));

app.listen(app.get("port"), function () {
  console.log("Node app is running at : " + app.get("port"));
});
