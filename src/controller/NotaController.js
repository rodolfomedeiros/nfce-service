const notaService = require('../services/NotaService');

const info = async (req, res) => {
  const nfceKey = req.query.nfceKey;
  return await notaService.getInfo(nfceKey)
  .then(
    nota => res.json(nota)
  )
  .catch(
    error => res.json(error)
  );
}

exports.info = info;