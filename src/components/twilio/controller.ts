import { Twilio} from "twilio";
import { Request, Response } from "express";
import * as dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = new Twilio(accountSid, authToken);

export default class TwilioController {
  static async sendSMS(req: Request, res: Response) {
    const { to, body } = req.body;

    try {
      const message = await client.messages.create({
        to,
        from: twilioNumber,
        body
      });

      return res.status(200).json({ message: "SMS sent successfully" });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}
