module.exports = {
  getClassError(codeError) {
    switch (codeError.substring(0, 2)) {
      case "42":
        return "Syntax Error or Access Rule Violation";
        break;

      case "50":
        return "System Error (errors external to PostgreSQL itself)";
        break;

      case "23":
        return "Integrity Constraint Violation";
        break;

      default:
        return "Classe d'erreur non répertoriée dans l'application";
        break;
    }
  },
  getMessageError(codeError) {
    switch (codeError) {
      case "42P01":
        return "undefined_table";
        break;

      case "42601":
        return "syntax_error";
        break;

      case "23505":
        return "unique_violation";
        break;

      default:
        return "Erreur non répertoriée dans l'application";
        break;
    }
  },
  getDetailsError(codeError) {
    const pgError = {};
    pgError.messageError = this.getMessageError(codeError);
    pgError.classError = this.getClassError(codeError);

    return pgError;
  },
};
