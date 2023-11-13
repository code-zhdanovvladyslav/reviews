const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const process = require("process");
const models = require("./models");
const Review = models['Review'];
const app = express();

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
  Review.findAll({
    order: [['updatedAt', 'DESC']]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
});

app.post("/", (req, res) => {

  const review = {
    title: req.body.title,
    content: req.body.content,
    rating: req.body.rating,
    author: req.body.author,
    email: req.body.email,
    phone: req.body.phone,
  };

  // Save Tutorial in the database
  Review.create(review)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
