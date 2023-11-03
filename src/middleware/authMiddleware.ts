import { Request, Response, NextFunction } from 'express';
import { environmentConfig, constant } from '../constants/index';
import jwt = require('jsonwebtoken');
import { ErrorResponse, InternalError } from '../utils/response.handler';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return ErrorResponse(res, 404, "Token not Found");

    const scheme = authorization.split(' ')[0];

    if (scheme !== 'Bearer') return ErrorResponse(res, 401, "Invalid Token..!");

    const token = authorization.split(' ')[1];
    jwt.verify(token, environmentConfig.JWT_SECRET, async (err, payload: any) => {
      if (err?.message == "jwt expired") {
        return ErrorResponse(res, 401, "Token Expired");
      }

      if (err && err?.message != "jwt expired") {
        return ErrorResponse(res, 401, "Invalid Token");
      }
      console.log("Decoded Payload", payload);
      
      if (payload) {
        let body: any = {
          _id: payload?._id,
          email: payload?.email
        }
        req.body = body;
        next()
      }
      else {
        return InternalError(res);
      }
    });

  } catch (error) {
    return ErrorResponse(res, 401, "Unauthorized..!")
  }
}

export const verifyBodyOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { verificationCode } = req.body;
    let { token } = req.params;

    verificationCode = verificationCode?.toString();

    if (verificationCode && verificationCode?.length != constant.OTP_LENGTH || verificationCode?.trim() == "")
      return ErrorResponse(res, 401, "Invalid OTP");

    if (!verificationCode && !token)
      return ErrorResponse(res, 404, "verificationCode not found");

    if (token) {
      req.headers["authorization"] = `Bearer ${token}`;
      verifyToken(req, res, next);
      // console.log("result-->", result)
      // next()
    } else {
      next()
    }

  } catch (error) {
    console.log("error-->", error)
    return InternalError(res)
  }
}