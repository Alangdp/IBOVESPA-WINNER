import type { RequestType } from '../../types/global.js';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from 'jsonwebtoken';

dotenv.config();

import { Request, Response, NextFunction } from 'express';

interface JwtDecoded extends JwtPayload {
  sub: string;
  userid?: number;
}

const loginRequired = (req: RequestType, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const [_, token] = req.headers.authorization.split(' ');

    if (!token) return res.status(401).json({ msg: 'Bearer Token is null' });

    const secret = process.env.SECRET_TOKEN as string;
    jwt.verify(token, secret, (err: Error | null, decoded: any) => {
      console.log(err);
      if (err) {
        return res.status(401).json({ msg: 'Invalid Bearer Token' });
      }
      const decodedJwt = decoded as JwtDecoded;
      req.userId = Number(decodedJwt?.sub);

      next();
    });
  } else {
    return res.status(401).json({ msg: 'Invalid Bearer Token' });
  }
};

export default loginRequired;
