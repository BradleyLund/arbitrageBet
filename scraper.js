const fetch = require("node-fetch");
const cheerio = require("cheerio");
const fs = require("fs");

const DOMParser = require("dom-parser");

async function scrapePage(url) {
  fetch("https://www.bet.co.za/sports/tennis/")
    .then(function (response) {
      // When the page is loaded convert it to text
      return response.text();
    })
    .then(function (html) {
      // Initialize the DOM parser
      var parser = new DOMParser();

      // Parse the text
      var doc = parser.parseFromString(html, "text/html");

      fs.appendFile("htmlFile.html", `${html}`, function (err) {
        if (err) {
          console.log(err);
        }
        console.log("updated");
      });

      // You can now even select part of that html as you would in the regular DOM
      // Example:
      var docArticle = doc.getElementsByClassName("panel-left").innerHTML;
      //   const $ = cheerio.load(doc);
      //   console.log(
      //     $(
      //       "#html-container-Center_DailyMatchListResponsiveBlock_19285 > sb-comp > div > div:nth-child(2) > sb-lazy-render > div:nth-child(1) > div > div > div.rj-ev-list__ev-card__section.rj-ev-list__ev-card__section--TwoBox.rj-ev-list__market-1_60010352 > button.rj-ev-list__bet-btn.rj-ev-list__selection-0ML60010352_1 > div > span"
      //     )
      //   );
      console.log(docArticle);
    })
    .catch(function (err) {
      console.log("Failed to fetch page: ", err);
    });

  //   const result = await fetch(`https://www.bet.co.za/sports/tennis/`);
  //   const text = await result.text();

  //   console.log(json);
}

scrapePage();
