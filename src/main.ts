import { runApp } from "./app/app";
import * as dotenv from "dotenv";
import "reflect-metadata";

dotenv.config({ path: __dirname + "/../.env" });

runApp(
  process.argv[2] === "--dev"
    ? process.env.BOT_TOKEN_DEV
    : process.env.BOT_TOKEN_PROD
);
