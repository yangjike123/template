import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { HttpCode } from '../../types/httpCode';
export default function verifyPayload(validations: ValidationChain[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map((validation) => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            res.status(HttpCode.BadRequest).json({
                status: HttpCode.BadRequest,
                errors: errors.array()
            });
        }

    }
}