const notaService = require('./services/NotaService');

const nfcKey = '24200210670811001044651010000360479291169643';

(async () => {
  
  const nota = await notaService.getInfo(nfcKey);

  console.log(nota);

})();