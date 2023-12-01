"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function paginationMiddleware(req, res, next) {
    var page = parseInt(req.query.page) || 1; // Current page, default to 1 if not provided
    var count = parseInt(req.query.count) || 10; // Items per page, default to 10 if not provided
    // Calculate the start and end indices based on the pagination parameters
    var skip = (page - 1) * count;
    var take = page * count;
    req.query.skip = skip.toString();
    req.query.take = take.toString();
    next();
}
exports.default = paginationMiddleware;
