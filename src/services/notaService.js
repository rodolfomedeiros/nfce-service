const puppeteer = require('puppeteer');

const config = require('../config/config');
const notaSelectors = require('../config/notaSelectors');

const getInfo = async (nfcKey) => {
  if (nfcKey) {
    const url = config.urlNota + nfcKey;
    nota = await search(url);
    if (nota) {
      console.log('get into finished');
      return nota;
    }else {
      console.log('url null');
    }
  } else {
    console.log('nfcKey null');
  }
};

const search = async (url) => {
  if(!url) return null;
  let f = false;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url).catch(e => {
    console.log(e);
    f = true;
  });

  await page.waitForSelector(notaSelectors.emitente, {timeout: 5000}).catch(
    e => {
      console.log(e);
      f = true;
    }
  );

  if(f) {
    await browser.close();
    return null;
  }
  const nota = {};

  // emitente
  nota.emitente = await page.$eval(notaSelectors.emitente, node => {
    return node.textContent.split(':')[1].trim();
  });
  nota.cpfEmitente = await page.$eval(notaSelectors.cpfEmitente, node => {
    return node.textContent.split(':')[1].trim();
  });
  nota.ieEmitente = await page.$eval(notaSelectors.ieEmitente, node => {
    return node.textContent.split(':')[1].trim();
  });
  nota.endEmitente = await page.$eval(notaSelectors.endEmitente, node => {
    return node.textContent.split(':')[1].trim();
  });

  // destinatario
  nota.cpfDestinatario = await page.$eval(notaSelectors.cpfDestinatario, node => {
    return node.textContent.split(':')[1].trim();
  });

  // valores
  nota.valorTotal = await page.$eval(notaSelectors.valorTotal, node => {
    return node.textContent.trim();
  });
  nota.valorDesconto = await page.$eval(notaSelectors.valorDesconto, node => {
    return node.textContent.trim();
  });
  nota.valorPago = await page.$eval(notaSelectors.valorPago, node => {
    return node.textContent.trim();
  });
  nota.formaPag = await page.$eval(notaSelectors.formaPag, node => {
    return node.textContent.trim();
  });

  // get items
  nota.items = await page.$$eval(notaSelectors.items, nodes => {
    return nodes.map(
      node => {
        let values = [];
        let childs = node.childNodes;
        childs.forEach(
          child => {
            let value = child.textContent.trim();
            if (value != '') {
              values.push(value)
            }
          }
        )
        return values;
      }
    ).slice(1);
  });

  nota.chave = await page.$eval(notaSelectors.chave, node => {
    return node.textContent.trim();
  });
  nota.dataEmissao = await page.$eval(notaSelectors.dataEmissao, node => {
    let d = node.textContent.split(':');
    return d.slice(1).join(':').trim();
  });
  nota.dataAutorizacao = await page.$eval(notaSelectors.dataAutorizacao, node => {
    let d = node.textContent.split(':');
    return d.slice(1).join(':').trim();
  });
  nota.protocolo = await page.$eval(notaSelectors.protocolo, node => {
    return node.textContent.split(':')[1].trim();
  });
  nota.situacao = await page.$eval(notaSelectors.situacao, node => {
    return node.textContent.split(':')[1].trim();
  });

  await browser.close();
  return nota;
};

exports.getInfo = getInfo;