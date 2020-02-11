
class NfceKeyError extends Error {
  constructor ({ message, type, errors } = {}) {
    super()

    this.name = 'NfceKeyError'
    this.message = message
    this.type = type
    this.errors = errors
  }
}

exports.NfceKeyError = NfceKeyError;