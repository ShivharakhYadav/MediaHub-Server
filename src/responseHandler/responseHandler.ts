import { Response } from 'express';

const InternalError = (res: Response) => {
    return res.status(500).json({ success: false, message: "Internal Server Error", data: "" })
}

const ErrorResponse = (res: Response, code: number, message: string) => {
    return res.status(code).json({ success: false, message: message, data: "" })
}

const SuccessResponse = (res: Response, data: any, message: any) => {
    return res.status(200).json({ success: true, data: data, message: message })
}

export { InternalError, ErrorResponse, SuccessResponse }