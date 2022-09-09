import { Request } from 'express';
interface CustomRequest extends Request {
    id?: number
}

export default CustomRequest;