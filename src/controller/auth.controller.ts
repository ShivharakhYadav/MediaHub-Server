import users from '../model/user.model';
import { Request, Response } from 'express';
import { ErrorResponse, SuccessResponse, InternalError } from '../responseHandler/responseHandler';
import { generateAccessToken, generateRefreshToken } from '../helpers';


const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email) return ErrorResponse(res, 404, "email not found");
        if (!password) return ErrorResponse(res, 404, "password not found");
        if (!username) return ErrorResponse(res, 404, "username not found");

        const user = await users.findOne({ email: email });

        if (user) {
            return ErrorResponse(res, 409, 'User already exist..!')
        }
        else {
            await users.create(req.body);
            return SuccessResponse(res, "", "");

        }
    } catch (error) {
        console.log("Register err", error)
        return InternalError(res);
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email) return ErrorResponse(res, 404, "email not found");
        if (!password) return ErrorResponse(res, 404, "password not found");

        const user = await users.findOne({ $and: [{ email: email }, { password: password }] }, { password: 0, __v: 0 });
        // User Not Found
        if (!user) return ErrorResponse(res, 401, "Unauthorized");

        let body = {
            id: user._id,
            email: email
        }
        const accessToken = generateAccessToken(body)
        const refreshToken = generateRefreshToken(body)

        if (accessToken != null && refreshToken != null) {
            //Reponse to be send
            let obj = {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
            return SuccessResponse(res, obj, "Login Successfull")
        }
        else {
            return ErrorResponse(res, 403, "Token Generation Failed");
        }
    } catch (error) {
        console.log("Register err", error)
        return InternalError(res);
    }
}
export { register, login }