class ModelError {
  constructor(
    classError,
    messageError,
    codeError,
    httpResponseStatusCode,
    detail
  ) {
    this.messageError = messageError;
    this.classError = classError;
    this.codeError = codeError;
    this.httpResponseStatusCode = httpResponseStatusCode;
    this.detail = detail;
  }
}

module.exports = ModelError;
