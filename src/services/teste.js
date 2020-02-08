const puppeteer = require('puppeteer');
const url = 'https://nfce.set.rn.gov.br/portalDFE/nota-potiguar/nfce-mobile-danfe.aspx?chNFCe=24200210670811001044651010000360479291169643&token=69FF4439A9FBE92CF215E7722A1B6187';
const options = {
    headless: true
};
const selector = 'span#tbItensList_lblTbItensCodigo_';
(async function(){
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto(url);
    const numbers = await page.$$eval(selector, nodes => {
        return nodes.map(node => {
            return node.textContent;
        })
    });
    console.log(numbers);
    await browser.close();
})();