import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async(host = "db_auth"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  console.log("📦 Connected with database");

  return createConnection(
    Object.assign(defaultOptions, {
      host
    })
  )
}