import axios from 'axios';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const SUPABASE_KEY = process.env.SUPABASE_KEY;

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
  };

  const url = `https://cotikmecrrykjmssypxs.supabase.co/rest/v1/users?select=*&email=eq.${email}`;

  try {
    const response = await axios.get(url, { headers });
    const user = response.data[0];

    if (!user) {
      res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).json({ ok: false, message: 'Contraseña incorrecta' });
      return;
    }

    res.status(200).json({ ok: true, user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export default { login };