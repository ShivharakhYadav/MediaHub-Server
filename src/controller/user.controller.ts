import Users from '../model/user.model';
import { Request, Response } from 'express';
import { ErrorResponse, SuccessResponse } from '../utils/response.handler';

export const getUserByID = async (req: Request, res: Response) => {
    try {
        console.log("req", req.body, req.params, req.query)
        console.log("token", req.headers.authorization)
        let userId = req?.params?.id;
        if (!userId) return ErrorResponse(res, 404, "id not found");

        const user = await Users.findOne({ _id: userId }, { password: 0, __v: 0 })
        if (!user) return ErrorResponse(res, 404, "User not Found");

        return SuccessResponse(res, user, "")
    } catch (error) {
        res.status(500).send(error)
    }
}