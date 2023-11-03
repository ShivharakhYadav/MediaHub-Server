import users from '../model/user.model';
import { Request, Response } from 'express';

export const getUserByID = (req: Request, res: Response) => {
    try {

    } catch (error) {
        res.status(500).send(error)
    }
}