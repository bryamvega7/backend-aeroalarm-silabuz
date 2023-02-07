import axios from 'axios';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN;

const postBestFlight = async (req: Request, res: Response) => {
  const { adults, origin, destination, departureDate } = req.body;
  const url = `https://app.goflightlabs.com/search-best-flights?access_key=${accessToken}&adults=${adults}&origin=${origin}&destination=${destination}&departureDate=${departureDate}&currency=PEN`;

  try {
    const response = await axios.get(url);

    return res.status(200).json({ flights: response.data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};


interface Flight {
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  flight_number: string;
  airline: string;
  logo_airline: string;
  price: string;
}

const getAllData = async (req: Request, res: Response) => {
  const { adults, origin, destination, departureDate } = req.body;
  const url = `https://app.goflightlabs.com/search-best-flights?access_key=${accessToken}&adults=${adults}&origin=${origin}&destination=${destination}&departureDate=${departureDate}&currency=PEN`;

  try {
    const response = await axios.get(url);

    const origin = response.data.data.buckets[0].items[0].legs[0].origin.city;
    const destination = response.data.data.buckets[0].items[0].legs[0].destination.city;
    const departure_time = response.data.data.buckets[0].items[0].legs[0].segments[0].departure;
    const arrival_time = response.data.data.buckets[0].items[0].legs[0].segments[0].arrival;
    const flight_number = response.data.data.buckets[0].items[0].legs[0].segments[0].flightNumber;
    const airline = response.data.data.buckets[0].items[0].legs[0].carriers.marketing[0].name;
    const logoAirline = response.data.data.buckets[0].items[0].legs[0].carriers.marketing[0].logoUrl;
    const price = response.data.data.buckets[0].items[0].price.formatted;


    return res.status(200).json({ 
      origin: origin,
      destination: destination,
      departure_time: departure_time,
      arrival_time: arrival_time,
      flight_number: flight_number,
      airline: airline,
      logo_airline: logoAirline,
      price: price
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default { postBestFlight, getAllData };
