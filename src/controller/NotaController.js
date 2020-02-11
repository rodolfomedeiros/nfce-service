const notaService = require('../services/NotaService');

const info = async (req, res) => {
  const nfcKey = req.query.nfcKey;
  const nota = await notaService.getInfo(nfcKey);
  return res.json(nota);
}

exports.info = info;