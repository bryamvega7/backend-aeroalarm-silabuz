import express, { Application, Router } from "express";
import * as ROUTES from "../components";

const _routes: [string, Router][] = [
  ["flightlabs", ROUTES.flightlabsRouter],
];

const routes = (app: Application): void => {
  _routes.forEach(([path, controler]) => {
    app.use(`/api/v1/${path}`, controler);
  });
};

export default routes;
