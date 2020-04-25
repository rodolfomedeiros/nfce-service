const cheerio = require('cheerio');
const bent = require('bent');
const getHtmlString = bent('string');

const config = require('../config/config');
const notaSelectors = require('../config/notaSelectors');
const { isNfceKey } = require('../validators/NotaValidator');
const { NfceKeyError } = require('../errors/NotaErrors');

const getInfo = async (nfceKey) => {
  if (isNfceKey(nfceKey)) {
    const url = config.urlNota + nfceKey;
    return await search(url);
  } else {
    throw new NfceKeyError({
      message: 'Erro: verifique a chave de acesso',
      type: 'validation_error',
      errors: [{
        message: 'A chave de acesso deve conter um total de 44 números e apenas números',
        service: 'nfce_key_validation'
      }]
    });
  }
};

const search = async (url) => {
  if(!url) return null;

  const txt = await getHtmlString(url);

  const $ = cheerio.load(txt);

  const nota = {
    'emitente' : null,
    'cnpjEmitente' : null,
    'ieEmitente' : null,
    'endEmitente' : null,
    'cpfDestinatario' : null,
    'endDestinatario' : null,
    'destinatario' : null,
    'valorTotal' : null,
    'valorDesconto' : null,
    'valorPago' : null,
    'formaPag' : null,
    'items' : null,
    'chave' : null,
    'dataEmissao' : null,
    'dataAutorizacao' : null,
    'protocolo' : null,
    'situacao' : null
  };

  if (!($(notaSelectors.chave).text().trim() != null && $(notaSelectors.chave).text().trim() != "")){
    return nota;
  }

  nota.chave = $(notaSelectors.chave).text().trim();

  // emitente
  nota.emitente = $(notaSelectors.emitente).text().split(':')[1].trim();

  nota.cnpjEmitente = $(notaSelectors.cnpjEmitente).text().split(':')[1].trim();

  nota.ieEmitente = $(notaSelectors.ieEmitente).text().split(':')[1].trim();

  nota.endEmitente = $(notaSelectors.endEmitente).text().split(':')[1].trim();

  // destinatario
  nota.cpfDestinatario = $(notaSelectors.cpfDestinatario).text().split(':')[1].trim();
  nota.destinatario = $(notaSelectors.destinatario).text().split(':')[1].trim();
  nota.endDestinatario = $(notaSelectors.endDestinatario).text().split(':')[1].trim();
  
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

  nota.dataEmissao = $(notaSelectors.dataEmissao).text().split(':').slice(1).join(':').trim();

  nota.dataAutorizacao = $(notaSelectors.dataAutorizacao).text().split(':').slice(1).join(':').trim();
  
  nota.protocolo = $(notaSelectors.protocolo).text().split(':')[1].trim();
  
  nota.situacao = $(notaSelectors.situacao).text().split(':')[1].trim();

  return nota;
};

exports.getInfo = getInfo;