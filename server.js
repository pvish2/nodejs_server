
// call the packages we need
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");



var Card = require("/Users/piyvishw/Documents/node js/app/models/card.js");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log("connection established");
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get("/", function(req, res) {
  res.json({ message: "test success!" });
});




///setup base data 
app.locals.cards = []

// more routes for our API will happen here

// on routes that end in /Card
// ----------------------------------------------------
router
  .route("/cards")
  // create a Card (accessed at POST http://localhost:8080/api/cards)
  .post(function(req, res) {


    var card = new Card(); // create a new instance of the Card model
    card.name = req.body.name; // set the card name (comes from the request)
    card.cardNumber = req.body.cardNumber; // set the card number (comes from the request)
    card.limit = req.body.limit; // set the card limit (comes from the request)
    card.balance = 0; // set the card balance default as 0
    


    

    if (!valid_credit_card(req.body.cardNumber)) {
      return res.json({ status :0 ,message: "invalid card" });
    }
    if (!valid_limit(req.body.limit)) {
      return res.json({ status :0 ,message: "card limit should be greater than 0" });
    }

    var cardsPre = app.locals.cards;
    cardsPre.push(card);

    app.locals.cards =cardsPre;
    return res.json({ status :1 ,message: "Card created!" });

  })

  // get all the cards (accessed at GET http://localhost:8080/api/cards)
  .get(function(req, res) {
    return res.json( app.locals.cards);
  })

  // delete the card with this id (accessed at DELETE http://localhost:8080/api/cards/:card_id)
  .delete(function(req, res) {
    Card.remove(
      {
        _id: req.params.card_id
      },
      function(err, card) {
        if (err) return res.json({ message: err });

        res.json({ message: "Successfully deleted" });
      }
    );
  });

//Check limit should not be less than 0
function valid_limit(value) {
  if (value < 0) return false;
  return true;
}

// Takes a credit card string value and returns true on valid number
function valid_credit_card(value) {
  //Accept only 10 digits
  if (value.length != 10) return false;
  // Accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value)) return false;
  // The Luhn Algorithm. 
  let nCheck = 0,
    bEven = false;
  value = value.replace(/\D/g, "");
  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);
    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;
    nCheck += nDigit;
    bEven = !bEven;
  }
  return nCheck % 10 == 0;
}

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
