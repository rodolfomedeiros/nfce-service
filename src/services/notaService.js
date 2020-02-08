const puppeteer = require('puppeteer');

const config = require('./config');

const getInfo = async (nfcKey = '24200210670811001044651010000360479291169643') => {
  if (nfcKey) {
    const url = config.urlNota
                + config.tagNfc
                + '='
                + nfcKey
                + '&'
                + config.tagToken
                + '='
                + config.token;
    //await search(url, nfcKey);
    console.log('search completa');

  } else {
    console.log('nfcKey null');
  }
};

const search = async (url, nfcKey) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});

  

  await page.pdf({path: "./temp/"+nfcKey+".pdf", format: 'A4'});

  await browser.close();
};

exports.getInfo = getInfo;