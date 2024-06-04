import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { matchURL } from "../utils/matchURLPath";
import { routes } from "./routes";
import { Sequelize } from "sequelize-typescript";

export type IncomingRequestHandler = {
  request: FastifyRequest;
  reply: FastifyReply;
  fastify: FastifyInstance;
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  params?: {
    [key: string]: any;
  };
};

export type Route = {
  handler: (requestHandler: IncomingRequestHandler) => Promise<any>;
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
};

export const handler = async function (requestHandler: IncomingRequestHandler) {
  const { path, reply, method } = requestHandler;

  for (const route of routes) {
    const params = matchURL(route.path, path);

    //params will be null if the path does not match the route,
    //If there are no route params, the params variable will be an empty object
    //which is a truthy value
    if (params && route.method === method) {
      return route.handler({ ...requestHandler, params });
    }
  }

  return reply.notFound("Route not found " + path);
};

declare module "fastify" {
  export interface FastifyInstance {
    sequelize: Sequelize;
  }
}
