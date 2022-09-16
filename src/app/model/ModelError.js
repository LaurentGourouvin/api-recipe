class ModelError {
  constructor(classError, messageError, codeError, httpResponseStatusCode) {
    this.messageError = messageError;
    this.classError = classError;
    this.codeError = codeError;
    this.httpResponseStatusCode = httpResponseStatusCode;
  }
}

module.exports = ModelError;
