import "reflect-metadata";
import { DataSource } from "typeorm";
import { Story } from "./Story";
import { Comment } from "./Comment";

const username = process.env.TYPE_ORM_USER_NAME;
const host = process.env.TYPE_ORM_HOST;
const password = process.env.TYPE_ORM_PASSWORD;
const database = process.env.TYPE_ORM_DATABASE;
// TODO: fix .env are not getting picked up

export const AppDataSource = new DataSource({
  type: "postgres",
  host: undefined,
  port: 5432,
  username: "colinsheppard",
  password: undefined,
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [Story, Comment],
  subscribers: [],
  migrations: [],
  ssl: false,
});
