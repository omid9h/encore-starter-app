import { cookies } from "next/headers";
import Client, { Environment } from "@/app/lib/client";

/**
 * Returns the Encore request client for either the local or staging environment.
 * If we are running the frontend locally (development) we assume that our Encore backend is also running locally
 * and make requests to that, otherwise we use the staging client.
 */
const getRequestClient = () => {
  const token = cookies().get("auth-token")?.value;
  const env =
    process.env.NODE_ENV === "development"
      ? "https://staging-starter-49p2.encr.app"
      : Environment("staging");

  return new Client(env, {
    auth: token,
  });
};

export default getRequestClient;
