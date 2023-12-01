"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJoiValidationErrorIfExists = void 0;
function getJoiValidationErrorMsgIfExists(error) {
    if (!error) {
        return null;
    }
    var errorMessages = error.details.map(function (detail) { return detail.message; });
    return errorMessages.join(",");
}
exports.getJoiValidationErrorIfExists = getJoiValidationErrorMsgIfExists;
