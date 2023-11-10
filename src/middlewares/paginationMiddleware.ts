import { NextFunction, Request, Response } from "express";

export default function paginationMiddleware(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1; // Current page, default to 1 if not provided
    const count = parseInt(req.query.count as string) || 10; // Items per page, default to 10 if not provided
    // Calculate the start and end indices based on the pagination parameters
    const skip = (page - 1) * count;
    const take = page * count;
    req.query.skip =skip.toString();
    req.query.take =take.toString();
    next();
}