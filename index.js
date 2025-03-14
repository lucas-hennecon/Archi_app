const { json } = require('express');
var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.

app.get("/", function(req, res) {
  res.send("Hello")
})

app.get('/test/mytest', function(req, res) {
  //ici construire la réponse HTTP
  // res.json({ "a": 1, "b": 2 });
  // res.json(["Hello", "World"]);
  //res.json(42);
  res.json({ "msg": req.url.substr(6) });

});

var cpt = 0;

app.get('/cpt/query', function(req, res) {
  res.json(cpt);
});

app.get('/cpt/inc', function(req, res) {
  if (req.query.v === undefined) {
    cpt++;
    return res.json({ "code": 0 });
  }

  var increment = req.query.v;

  // Verify with a regex if `increment` is an integer
  if (/^-?\d+$/.test(increment)) {
    cpt += parseInt(increment, 10);
    res.json({ "code": 0 });
  } else {
    res.json({ "code": -1 });
  }
});




var allMsgs = [{
  "title": "TransMLA: Multi-Head Latent Attention Is All You Need",
  "url": "https://arxiv.org/pdf/2502.07864",
  "image": "img/arxiv.png",
  "posted_by": "JEFE",
  "date": "2025-03-07 10:30:00"
},
{
  "title": "Learning Transferable Visual Models From Natural Language Supervision",
  "url": "https://arxiv.org/pdf/2103.00020",
  "image": "img/arxiv.png",
  "posted_by": "NI",
  "date": "2025-03-07 10:35:00"
}]

app.get('/msg/get/*', function(req, res) {
  var indice = req.url.substr(9);
  if (indice <= allMsgs.length && /^-?\d+$/.test(indice)) {
    res.json({ "code": 1, "msg": allMsgs[indice] });
  } else {
    res.json({ "code": 0 });
  }
});

app.get('/msg/nber', function(req, res) {
  res.json(allMsgs.length);
});

app.get('/msg/getAll', function(req, res) {
  res.json(allMsgs);
});

/*app.get('/msg/post/*', function(req, res) {
  var msg = req.url.substr(10);
  allMsgs.push(decodeURIComponent(msg));
  res.json(allMsgs.length - 1);
});*/

app.get('/msg/post', function(req, res) {
  var pseudo = req.query.pseudo;
  var title = req.query.title;
  var url = req.query.url;
  var time = req.query.time;
  var image = req.query.image || "img/arxiv.png"; // Default value

  // Check if any required parameter is missing
  if (!pseudo || !title || !url || !time) {
    return res.json({ "error": "Missing required fields" });
  }

  var article = {
    "title": title,
    "url": url,
    "image": image,
    "posted_by": pseudo,
    "date": time
  };

  allMsgs.push(article);
  res.json({ "index": allMsgs.length - 1 }); // Return the index of the new article
});



app.get('/msg/del/*', function(req, res) {
  var i = req.params[0];

  if (/^-?\d+$/.test(i)) {
    i = parseInt(i, 10);
    if (i >= 0 && i < allMsgs.length) {
      allMsgs.splice(i, 1); // Supprime 1 élément à l'index i
      return res.json({ "length": allMsgs.length });
    }
  }
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");

