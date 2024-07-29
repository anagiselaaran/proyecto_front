import { JwtPayload } from 'jwt-decode';

export interface CustomPayload extends JwtPayload{
    userId: number,
    role: string,
    iat:number
  }