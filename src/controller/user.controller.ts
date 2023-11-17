import Users from '../model/user.model';
import { Request, Response } from 'express';
import { ErrorResponse, SuccessResponse } from '../utils/response.handler';
import { jwtDecode } from 'jwt-decode';

export const getUserByID = async (req: any, res: Response) => {
    try {
        // let allParams: Object = req?.params;
        let userId = req?.params?.id;
        let token = req.headers.authorization;
        let id;
        console.log("req", req.body, req.params, req.query)
        console.log("token", req.headers.authorization)

        // if (allParams.hasOwnProperty("id") && !userId) {
        // }

        if (!userId) return ErrorResponse(res, 404, "params id not found");

        // if (allParams.hasOwnProperty("id") && userId) {
        //     id = userId;
        // }

        // if (!req._id) {
        //     return ErrorResponse(res, 404, "id not found")
        // }
        // else {
        //     id = req._id;
        // }

        const user = await Users.findOne({ _id: userId }, { password: 0, __v: 0 })
        if (!user) return ErrorResponse(res, 404, "User not Found");

        return SuccessResponse(res, user, "")
    } catch (error) {
        res.status(500).send(error)
    }
}