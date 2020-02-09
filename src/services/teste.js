const puppeteer = require('puppeteer');
const url = 'https://nfce.set.rn.gov.br/portalDFE/nota-potiguar/nfce-mobile-danfe.aspx?chNFCe=24200210670811001044651010000360479291169643&token=69FF4439A9FBE92CF215E7722A1B6187';

const selector = 'table#tbItensList tr';
(async function(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const numbers = await page.$$eval(selector, nodes => {
        return nodes.map(
            node => {
                let values = [];
                let childs =  node.childNodes;
                childs.forEach(
                     child => {
                        let value = child.textContent.trim();
                        if(value != ''){
                            values.push(value)
                        }
                     }
                )
                return values;
            }
        )
    });

    
    console.log(numbers);
    await browser.close();
})();