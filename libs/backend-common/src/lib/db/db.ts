import { MongoClient, ServerApiVersion } from 'mongodb';
import { DBListing } from '@zaxido/types-common';

export interface GetUriProps {
  username: string;
  password: string;
  dbName: string;
  domain: string;
}

export function getUri({ username, password, dbName, domain }: GetUriProps) {
  return `mongodb+srv://${username}:${encodeURIComponent(
    password
  )}@${dbName}.${domain}/?retryWrites=true&w=majority`;
}

export type ConnectProps = GetUriProps;

export async function connect({
  username,
  password,
  dbName,
  domain,
}: ConnectProps) {
  const uri = getUri({ username, password, dbName, domain });

  const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

  await client.connect();

  const db = client.db(dbName);

  const collections = {
    listings: db.collection<DBListing>('listings'),
  };

  async function closeConnection() {
    await client.close();
  }

  return {
    client,
    collections,
    closeConnection,
  };
}
