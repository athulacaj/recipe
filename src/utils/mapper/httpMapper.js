"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestToHttpRequestMapper = exports.requestToHttpResponseMapper = void 0;
var requestToHttpResponseMapper = function (statusCode, data) { return ({
    body: data,
    statusCode: statusCode
}); };
exports.requestToHttpResponseMapper = requestToHttpResponseMapper;
var requestToHttpRequestMapper = function (req) {
    var httpRequest = {
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query
    };
    return httpRequest;
};
exports.requestToHttpRequestMapper = requestToHttpRequestMapper;
