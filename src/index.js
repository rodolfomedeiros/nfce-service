
const cheerio = require('cheerio');

const notaSelectors = require('./config/notaSelectors');

const bent = require('bent');
const getHtmlString = bent('string');

const search = async (url = 'https://nfce.set.rn.gov.br/portalDFE/NFCe/mDadosNFCe.aspx?p=24200210670811001044651010000360479291169643') => {
  const txt = await getHtmlString(url);

  const $ = cheerio.load(txt);

  const nota = {};

  // emitente
  nota.emitente = $(notaSelectors.emitente).text().split(':')[1].trim();

  nota.cpfEmitente = $(notaSelectors.cpfEmitente).text().split(':')[1].trim();

  nota.ieEmitente = $(notaSelectors.ieEmitente).text().split(':')[1].trim();

  nota.endEmitente = $(notaSelectors.endEmitente).text().split(':')[1].trim();

  // destinatario
  nota.cpfDestinatario = $(notaSelectors.cpfDestinatario).text().split(':')[1].trim();

  // valores
  nota.valorTotal = $(notaSelectors.valorTotal).text().trim();

  nota.valorDesconto = $(notaSelectors.valorDesconto).text().trim();

  nota.valorPago = $(notaSelectors.valorPago).text()

  nota.formaPag = $(notaSelectors.formaPag).text()

  // get items
  nota.items = $(notaSelectors.items).toArray().map((node) => {
    return node.childNodes.filter(
      tag => tag.type == 'tag'
    ).map(
      td => {return $(td).text().trim()}
    ).filter(
      value => value.length > 0
    );
  }).slice(1);

  nota.chave = $(notaSelectors.chave).text().trim();

  nota.dataEmissao = $(notaSelectors.dataEmissao).text().split(':').slice(1).join(':').trim();

  nota.dataAutorizacao = $(notaSelectors.dataAutorizacao).text().split(':').slice(1).join(':').trim();
  
  nota.protocolo = $(notaSelectors.protocolo).text().split(':')[1].trim();
  
  nota.situacao = $(notaSelectors.situacao).text().split(':')[1].trim();

  console.log(nota);

  return nota;
}

search();

