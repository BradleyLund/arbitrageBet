const puppeteer = require("puppeteer");
const fs = require("fs");

async function scrapeWebsite(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  //   const [el] = await page.$x('//*[@id="imgBlkFront"]');

  const [el] = await page.$x(
    "/html/body/div[5]/div/div[3]/div[2]/sb-block[6]/div/div/div[1]/div[3]/a/img"
  );

  const src = await el.getProperty("src");
  const srcTxt = await src.jsonValue();

  console.log({ el, srcTxt });

  browser.close();
}

// scrapeWebsite(
//   "https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X"
// );

scrapeWebsite("https://www.bet.co.za/sports/tennis/");
