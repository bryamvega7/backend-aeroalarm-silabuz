import axios from 'axios';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN;

const getBestFlight = async (req: Request, res: Response) => {
  const { adults, origin, destination, departureDate } = req.query;
  const url = `https://app.goflightlabs.com/search-best-flights?access_key=${accessToken}&adults=${adults}&origin=${origin}&destination=${destination}&departureDate=${departureDate}&currency=PEN`;

  try {
    const response = await axios.get(url);

    return res.status(200).json({ flights: response.data.data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const postBestFlight = async (req: Request, res: Response) => {
  const { adults, origin, destination, departureDate } = req.body;
  const url = `https://app.goflightlabs.com/search-best-flights?access_key=${accessToken}&adults=${adults}&origin=${origin}&destination=${destination}&departureDate=${departureDate}&currency=PEN`;

  try {
    const response = await axios.get(url);

    return res.status(200).json({ flights: response.data.data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default { getBestFlight, postBestFlight };
