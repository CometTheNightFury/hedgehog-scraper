const express = require('express');
const app = express();
const cors = require('cors');
const Nightmare = require('nightmare');

const port = 3000;

app.use(cors());

// first endpoint - already built
// this says that when the app is at "/" - so "home", it will send a response of "Hedgehog Time". That is why we see those words on the screen when we go to localhost:3000/.
app.get('/', (req, res) => {
  res.send("Hedgehog Time");
});

// your endpoint
app.get('/pets', (req, res) => {
  res.send("Dragons are the best. Try me.");
});

// scraper endpoint
app.get('/:name', (req, res) => {
  var name = req.params.name;

  res.send(`Hi, ${name}!`);
});

//endpoint

app.get('/hedgie/:keyword', (req, res) => {
  var keyword = req.params.keyword;

  function findHedgieImage(keyword) {
    var nightmare = Nightmare({ show: true }); //creates bot

    return nightmare
      .goto('https://www.google.com') //goes to google
      .insert('input[title="Search"]', `hedgehog ${keyword}`) //bot inserts hedgehog and typed word into search bar
      .click('input[value="Google Search"]') //bot searches google for things
      .wait('a.q.qs') //bot waits for images link to appear
      .click('a.q.qs') //bot clicks on images tab
      .wait('div#res.med') //bot waits for images to appear
      .evaluate(function() {
        var photoDivs = document.querySelectorAll('img.rg_ic');
        var list = [].slice.call(photoDivs); //bot gathers all image containers into one collection

        return list.map(function(div) {
          return div.src; //bot returns images
        });
      })
      .end()
      .then(function (result) {
        return result.slice(1, 5); //bot collects images 1-4, stops at 5
      })
      .then(function (images) {
        res.json(images); //bot gives images to user
      })
      .catch(function (error) {
        console.error('Search failed:', error);
      });
  }

  findHedgieImage(keyword);
  var nightmare = Nightmare({show:true}); //shows what bot is doing

});


app.listen(port, () => {
  console.log(`app running on ${port}`);
});
