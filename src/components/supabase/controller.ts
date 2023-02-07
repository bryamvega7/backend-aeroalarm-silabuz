import axios from 'axios';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const SUPABASE_KEY = process.env.SUPABASE_KEY;

const postUser = async (req: Request, res: Response) => {
const { firstName, lastName, email, password, phone } = req.body;

const headers = {
'apikey': SUPABASE_KEY,
'Authorization': `Bearer ${SUPABASE_KEY}`,
'Content-Type': 'application/json',
'Prefer': 'return=minimal'
};

const url = 'https://cotikmecrrykjmssypxs.supabase.co/rest/v1/users';
const data = { firstName, lastName, email, password, phone };

try {
    const response = await axios.post(url, data, { headers });
    return res.status(200).json({ Registro: "OK" });
} catch (error) {
    return res.status(500).json({ message: error });
    }
};
    
export default { postUser };