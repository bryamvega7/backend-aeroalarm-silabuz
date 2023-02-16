import { Router } from "express";
import * as Controller from "./controller";
import TwilioController from '../twilio/controller';

const twilioRouter = Router();

twilioRouter.post("/send-sms", TwilioController.sendSMS);

export default twilioRouter;