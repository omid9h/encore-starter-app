import { cookies } from "next/headers";
import getRequestClient from "@/app/lib/getRequestClient";
import { auth } from "@/app/lib/client";

export async function GET(req: Request) {
  let response: auth.LoginResponse
  try {
    const client = getRequestClient();
    response = await client.auth.Login();
    cookies().set("state", response.state);
  } catch (error) {
    console.error(error);
    return Response.redirect("https://encore-starter-app-bp.vercel.app/error");
  }

  console.log(response?.auth_code_url)
  return Response.redirect(new URL(response?.auth_code_url));
}
