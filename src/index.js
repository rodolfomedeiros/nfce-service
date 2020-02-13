const request = require('request');
const parse5  = require('parse5');
const fs = require('fs');

const req = async () => {
  
  request('https://nfce.set.rn.gov.br/portalDFE/NFCe/mDadosNFCe.aspx?p=24200210670811001044651010000360479291169643',
  (err, res, body) => {
    if (err) { return console.log(err); }

    fs.writeFile('temp/html.txt', res.body.trim(), (err) => {
      if (err) console.log(err);
      console.log("Successfully Written to File.");
    });
  });

}

const scrap = async () => {

  const txt = await read('./temp/html.txt');

  const doc = parse5.parse(txt);

  console.log(doc);
}

const read = (txt) => {
  return fs.readFileSync(txt, 'utf8').trim();
}

scrap();

