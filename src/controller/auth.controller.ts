import Users from '../model/user.model';
import { Request, Response } from 'express';
import { ErrorResponse, SuccessResponse, InternalError } from '../utils/response.handler';
import { generateAccessToken, generateRefreshToken } from '../helpers';
import { otpGenerator, sendMail, validateOTP } from '../helpers copy';
import { constant } from '../constants';


const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email) return ErrorResponse(res, 404, "email not found");
        if (!password) return ErrorResponse(res, 404, "password not found");
        if (!username) return ErrorResponse(res, 404, "username not found");

        const users = await Users.findOne({ email: email });

        if (users && users.isVerified) {
            return ErrorResponse(res, 409, 'User already exist..!')
        }
        else if (users && !users.isVerified) {
            const verificationCode = await otpGenerator();

            //Generating ExpireTime
            const currentDate = new Date();
            const expiresIn = new Date();
            expiresIn.setMinutes(currentDate.getMinutes() + constant.OTP_EXPIRE_TIME)

            //Sending Email
            let emailSent = await sendMail(email, verificationCode);

            if (emailSent) {
                const otpObj = { verificationCode: verificationCode, expiresIn: expiresIn.getTime() }
                console.log("otpObj 1-->", otpObj)
                await Users.findOneAndUpdate({ email: email }, { verification: otpObj });

                return ErrorResponse(res, 403, 'Verify OTP with Email')
            } else {
                return ErrorResponse(res, 500, 'Email Generation Failed')
            }
        }
        else {
            const newuser: any = await Users.create({
                email,
                password: password,
                username: username
            });

            if (!newuser) {
                return InternalError(res);
            } else {
                const verificationCode = await otpGenerator();

                //Generating ExpireTime
                const currentDate = new Date();
                const expiresIn = new Date();
                expiresIn.setMinutes(currentDate.getMinutes() + constant.OTP_EXPIRE_TIME)

                //Sending Email
                let emailSent = await sendMail(email, verificationCode);

                if (emailSent) {
                    const otpObj = { verificationCode: verificationCode, expiresIn: expiresIn.getTime() }
                    console.log("otpObj 2-->", otpObj)
                    await Users.findOneAndUpdate({ email: email }, { verification: otpObj });

                    return ErrorResponse(res, 403, 'Verify OTP with Email')
                } else {
                    return ErrorResponse(res, 500, 'Email Generation Failed')
                }
            }
        }
    } catch (error: any) {
        console.log("register errr", error)
        return InternalError(res)
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email) return ErrorResponse(res, 404, "email not found");
        if (!password) return ErrorResponse(res, 404, "password not found");

        const user = await Users.findOne({ $and: [{ email: email }, { password: password }] }, { password: 0, __v: 0 });
        // User Not Found
        if (!user) return ErrorResponse(res, 401, "Unauthorized");

        if (!user.isVerified) {
            const verificationCode = await otpGenerator();

            //Generating ExpireTime
            const currentDate = new Date();
            const expiresIn = new Date();
            expiresIn.setMinutes(currentDate.getMinutes() + constant.OTP_EXPIRE_TIME)

            //Sending Email
            let emailSent = await sendMail(email, verificationCode);
            // let emailSent = true

            if (emailSent) {
                const otpObj = { verificationCode: verificationCode, expiresIn: expiresIn.getTime() }
                console.log("otpObj 1-->", otpObj)
                await Users.findOneAndUpdate({ email: email }, { verification: otpObj });

                return ErrorResponse(res, 403, 'Verify OTP with Email')
            } else {
                return ErrorResponse(res, 500, 'Email Generation Failed')
            }
        }
        else {

            let body: any = {
                _id: user?._id,
                email: user?.email
            }

            if (user?.verification) {
                user.verification = undefined;
                await user.save()
            }

            const accessToken = generateAccessToken(body)
            const refreshToken = generateRefreshToken(body)

            if (accessToken != null && refreshToken != null) {
                body["accessToken"] = accessToken;
                body["refreshToken"] = refreshToken;

                // res.cookie("refreshToken", refreshToken, { httpOnly: true });
                return SuccessResponse(res, body, "")
            }
            else {
                return ErrorResponse(res, 403, "Token Generation Failed");
            }
        }
        // let body = {
        //     id: user._id,
        //     email: email
        // }
        // const accessToken = generateAccessToken(body)
        // const refreshToken = generateRefreshToken(body)

        // if (accessToken != null && refreshToken != null) {
        //     //Reponse to be send
        //     let obj = {
        //         accessToken: accessToken,
        //         refreshToken: refreshToken
        //     }
        //     return SuccessResponse(res, obj, "Login Successfull")
        // }
        // else {
        //     return ErrorResponse(res, 403, "Token Generation Failed");
        // }
    } catch (error) {
        console.log("login err", error)
        return InternalError(res);
    }
}

const verifyOTP = async (req: Request, res: Response) => {
    try {
        let { verificationCode } = req.body;
        if (req.method.toLowerCase() == "get") {
            const { token } = req.params;
            verificationCode = token;
        }

        const user: any = await Users.findOne({ "verification.verificationCode": verificationCode })

        console.log("user", user?.verification)

        if (user && user?.verification) {
            let isSuccess = false;

            //Checking Verfication via otp or link
            const isOtp = /^[0-9]{6}$/.test(verificationCode)
            console.log("isOtp-->", isOtp)
            if (isOtp) {
                const otpValid = await validateOTP(user?.verification?.expiresIn as any)
                console.log("otpValid", otpValid)
                if (!otpValid) {
                    user.verification = undefined;
                    await user?.save();
                    return ErrorResponse(res, 401, "OTP Expired")
                }
                else {
                    isSuccess = true;
                }
            }
            else {
                isSuccess = true
            }

            if (isSuccess) {
                user.isVerified = true;
                user.verification = undefined;
                await user?.save();
                return SuccessResponse(res, {}, "Code Verified")
            }
        }
        else {
            return ErrorResponse(res, 404, "OTP Not Found")
        }
    } catch (error) {
        console.log("error-->", error)
        return InternalError(res)
    }
}







export { register, login, verifyOTP }