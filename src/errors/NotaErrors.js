
class NfceKeyError extends Error {
  constructor ({ message, type, errors } = {}) {
    super()

    this.name = 'NfceKeyError'
    this.message = message
    this.type = type
    this.errors = errors
  }
}

class NfceServerNotFoundError extends Error {
  constructor ({ message, type, errors, reason} = {}) {
    super()

    this.name = 'NfceServerNotFoundError'
    this.message = message
    this.type = type
    this.errors = errors
    this.reason = reason
  }
}

exports.NfceKeyError = NfceKeyError;
exports.NfceServerNotFoundError = NfceServerNotFoundError;