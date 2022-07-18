import {ServerOptions} from "vite";
import pkg from"../../../package.json"
export const server:ServerOptions={
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
}