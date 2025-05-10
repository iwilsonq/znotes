import * as db from "$lib/server/database";
import type { ServerInit } from "@sveltejs/kit";
import Database from "better-sqlite3";

export const init: ServerInit = async () => {
  new Database("znotes.db");
};
