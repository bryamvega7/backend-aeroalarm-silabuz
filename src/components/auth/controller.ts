import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const secret = "mysecretkey";
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
};

export const authLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const url = `https://cotikmecrrykjmssypxs.supabase.co/rest/v1/users?email=eq.${email}`;
        const response = await axios.get(url, { headers });
        const user = response.data[0];
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
        } else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.status(401).json({ message: "Contraseña incorrecta" });
            } else {
                const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" });
                res.status(200).json({ message: "Inicio de sesión exitoso", token });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export default { authLogin };