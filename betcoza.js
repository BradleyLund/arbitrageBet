const puppeteer = require("puppeteer");
const fs = require("fs");

async function scrapeWebsite(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  //   const [el] = await page.$x('//*[@id="imgBlkFront"]');

  //   const [el] = await page.$x(
  //     "  /html/body/div[5]/div/div[2]/div/section[7]/div[1]/div[2]/div[1]/div/div[2]/sb-comp/div/div[1]/sb-lazy-render/div[1]/div/div/div/button[1]/div/span"
  //   );

  //   const src = await el.getProperty("src");
  //   const srcTxt = await src.jsonValue();
  await page.waitForSelector(".rj-instant-collapsible");

  const spanArray = await page.$$(".rj-ev-list__ev-card__inner");
  // selector for the second odds  #html-container-Center_DailyMatchListResponsiveBlock_19285 > sb-comp > div > div:nth-child(2) > sb-lazy-render > div:nth-child(1) > div > div > div.rj-ev-list__ev-card__section.rj-ev-list__ev-card__section--TwoBox.rj-ev-list__market-1_60059368 > button.rj-ev-list__bet-btn.rj-ev-list__selection-0ML60059368_3 > div > span
  const countryName = await page.evaluate(() => {
    const span = document.querySelectorAll(".rj-ev-list__ev-card__inner");
    if (span != null) {
      return Array.from(span, (span) => {
        return span.innerText;
      });
    } else {
      return "Couldnt find";
    }
  });

  //   const [el2] = await page.$x(
  //     "  /html/body/div[5]/div/div[2]/div/section[7]/div[1]/div[2]/div[1]/div/div[2]/sb-comp/div/div[1]/sb-lazy-render/div[1]/div/div/div/button[1]/div/span"
  //   );
  //   const txt = await el2.getProperty("textContent");
  //   const rawTxt = await txt.jsonValue();

  for (let span of spanArray) {
    // const team1 = await span.$(
    //   ".rj-ev-list__ev-card__section-item rj-ev-list__ev-card__team-name rj-ev-list__ev-card__team-1-name"
    // );

    // const team1Txt = await team1.getProperty("textContent");
    // const rawTeamTxt = await team1Txt.jsonValue();

    // const properties = await span.getProperties();
    const txt = await span.getProperty("textContent");

    const rawTxt = await txt.jsonValue();
    console.log(rawTxt);
  }

  console.log({ countryName });

  browser.close();
}

// scrapeWebsite(
//   "https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X"
// );

scrapeWebsite("https://www.bet.co.za/sports/tennis/");
